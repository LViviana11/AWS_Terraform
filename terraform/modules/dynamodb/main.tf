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

  attribute {
    name = "documentNumb"
    type = "S"
  }

  global_secondary_index {
    name               = "documentNumb-index"
    hash_key           = "documentNumb"
    projection_type    = "ALL"
    read_capacity      = 8
    write_capacity     = 8
  }
}