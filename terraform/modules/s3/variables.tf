variable "s3_bucket_name" {
  description = "S3 bucket name"
  type        = string
  default     = "student-uploads-bucket"
}

variable "lambda_role_arn" {
  description = "The ARN of the IAM role for Lambda"
  type        = string
}

variable "s3_register_lambda_arn" {
  description = "The ARN of the Lambda function for S3 register"
  type        = string
}

variable "s3_register_lambda_name" {
  description = "The name of the Lambda function for S3 register"
  type        = string
}




