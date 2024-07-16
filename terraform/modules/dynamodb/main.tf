resource "aws_dynamodb_table" "students_table" {
  name           = var.dynamodb_table_name
  billing_mode   = "PROVISIONED"
  read_capacity  = 8
  write_capacity = 8
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}