output "deploy_role_arn" {
  description = "IAM role ARN reserved for future CI/CD deploys"
  value       = aws_iam_role.deploy.arn
}

output "route53_zone_id" {
  description = "Route53 zone ID (only set when var.domain_name is provided)"
  value       = try(aws_route53_zone.this[0].zone_id, null)
}

output "route53_name_servers" {
  description = "Add these as an NS record for var.domain_name in the parent domain's zone (in the other AWS account) to delegate DNS to this zone."
  value       = try(aws_route53_zone.this[0].name_servers, null)
}

output "acm_certificate_arn" {
  description = "Validated ACM certificate ARN, ready to attach to the CloudFront distribution via SST (only set when var.domain_name is provided)"
  value       = try(aws_acm_certificate_validation.this[0].certificate_arn, null)
}
