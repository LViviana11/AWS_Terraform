variable "s3_bucket_name" {
  description = "S3 bucket name"
  type        = string
  default     = "student-uploads-bucket"
}

variable "environment" {
  description = "The environment for the S3 bucket"
  type        = string
  default     = "dev"
}

