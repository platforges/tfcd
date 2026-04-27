terraform {
  required_version = "~> 1.9"

  backend "s3" {
    bucket       = "097614841487-tfstate"
    key          = "tfcd.tfstate"
    region       = "eu-west-2"
    use_lockfile = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
  default_tags {
    tags = { managedBy = "Terraform" }
  }
}
