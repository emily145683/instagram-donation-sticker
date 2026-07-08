variable "region" {
  description = "AWS region for the Terraform state bucket and lock table"
  type        = string
  default     = "eu-west-2"
}

variable "project" {
  description = "Project name used for resource naming"
  type        = string
  default     = "mock-instagram"
}
