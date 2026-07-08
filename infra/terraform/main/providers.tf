provider "aws" {
  region = var.region
}

# CloudFront requires ACM certificates to exist in us-east-1, regardless of
# where the rest of the stack lives.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
