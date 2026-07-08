variable "region" {
  description = "AWS region for app hosting resources"
  type        = string
  default     = "eu-west-2"
}

variable "project" {
  description = "Project name used for resource naming"
  type        = string
  default     = "mock-instagram"
}

variable "domain_name" {
  description = "Optional custom domain for the app. Leave empty to skip Route53/ACM and use the default SST/CloudFront URL."
  type        = string
  default     = ""
}
