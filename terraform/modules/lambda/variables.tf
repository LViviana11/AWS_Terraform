variable "crud_lambda_function_name" {
  description = "Lambda function name for CRUD"
  type        = string
  default     = "studentCrudLambdaFunction"
}

variable "s3_lambda_function_name" {
  description = "Lambda function name for S3"
  type        = string
  default     = "s3RegisterLambdaFunction"
}

variable "dynamodb_table_name" {
  description = "DynamoDB table name"
  type        = string
  default     = "students-table"
}

