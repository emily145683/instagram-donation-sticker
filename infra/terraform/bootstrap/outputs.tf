output "state_bucket" {
  description = "S3 bucket to use as the backend for infra/terraform/main"
  value       = aws_s3_bucket.terraform_state.bucket
}

output "lock_table" {
  description = "DynamoDB table to use for state locking in infra/terraform/main"
  value       = aws_dynamodb_table.terraform_lock.name
}
