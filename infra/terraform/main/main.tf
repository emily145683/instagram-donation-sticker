data "aws_caller_identity" "current" {}

# IAM role that CI/CD (e.g. GitHub Actions via OIDC) can assume in future to
# run `sst deploy` without long-lived static credentials. For now, deploys are
# run locally using your own AWS credentials — this role isn't required for
# that, it just exists so the deploy permissions are already defined and
# reviewable, ready to be wired into CI later.
resource "aws_iam_role" "deploy" {
  name = "${var.project}-deploy"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "deploy" {
  name = "${var.project}-deploy-policy"
  role = aws_iam_role.deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "StaticSiteHosting"
        Effect = "Allow"
        Action = [
          "s3:*",
          "cloudfront:*",
        ]
        Resource = "*"
      },
      {
        Sid    = "SstState"
        Effect = "Allow"
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters",
          "ssm:PutParameter",
          "ssm:DeleteParameter",
        ]
        Resource = "arn:aws:ssm:*:${data.aws_caller_identity.current.account_id}:parameter/sst/*"
      },
      {
        Sid      = "Identity"
        Effect   = "Allow"
        Action   = ["sts:GetCallerIdentity"]
        Resource = "*"
      }
    ]
  })
}

# --- Optional custom domain (disabled by default; set var.domain_name to enable) ---
#
# var.domain_name is treated as its own hosted zone (e.g. a subdomain such as
# "instagramdonations.aercademy.co.uk"), not a record inside an existing zone.
# The parent domain's zone lives in a separate AWS account/account-holder, so
# after applying, add the `route53_name_servers` output as an NS record for
# this subdomain in that parent zone to delegate DNS to the zone created here.

resource "aws_route53_zone" "this" {
  count = var.domain_name != "" ? 1 : 0
  name  = var.domain_name
}

resource "aws_acm_certificate" "this" {
  count             = var.domain_name != "" ? 1 : 0
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Since we own this zone, the ACM DNS validation record can be created and
# validated automatically without any manual DNS steps.
resource "aws_route53_record" "cert_validation" {
  for_each = var.domain_name != "" ? {
    for dvo in aws_acm_certificate.this[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  zone_id = aws_route53_zone.this[0].zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "this" {
  count                   = var.domain_name != "" ? 1 : 0
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.this[0].arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}
