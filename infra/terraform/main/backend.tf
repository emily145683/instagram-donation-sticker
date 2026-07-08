terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # bucket / region / dynamodb_table are supplied at `terraform init` time via
  # -backend-config, using the outputs from infra/terraform/bootstrap. Example:
  #
  #   terraform init \
  #     -backend-config="bucket=<state_bucket output>" \
  #     -backend-config="region=eu-west-2" \
  #     -backend-config="dynamodb_table=<lock_table output>"
  backend "s3" {
    key     = "mock-instagram/main.tfstate"
    encrypt = true
  }
}
