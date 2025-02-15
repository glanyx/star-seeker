
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "aws" {
  region = "eu-west-2"
}

resource "aws_security_group" "StarSeekerSG" {
  name = "StarSeekerSG"
  description = "For Next.js http traffic"
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "starseeker_ec2_instance" {
  ami = "ami-03a725ae7d906005d"
  instance_type = "t2.micro"
  security_groups = [aws_security_group.StarSeekerSG.name]
  key_name = "star-seeker"
  tags = {
    Name = "Star Seeker"
  }
}