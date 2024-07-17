variable "dynamodb_table_name" {
  description = "DynamoDB table name"
  type        = string
  default     = "studentTable"
}

variable "s3_bucket_name" {
  description = "S3 bucket name"
  type        = string
  default     = "student-uploads-bucket"
}

variable "crud_lambda_function_name" {
  description = "Lambda function name for CRUD"
  type        = string
  default     = "student-crud-lambda-function"
}

variable "s3_lambda_function_name" {
  description = "Lambda function name for S3"
  type        = string
  default     = "s3-register-lambda-function"
  
}


variable "lambda_invoke_arn" {
  description = "The ARN to invoke the Lambda function"
  type        = string
  default     = "lambda_invoke_arn"
}

variable "lambda_function_name" {
  description = "The name of the Lambda function"
  type        = string
  default     = "lambda_function_name"
}
