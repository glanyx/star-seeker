

# VPC
resource "aws_vpc" "star_seeker_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true
}

# Subnets
resource "aws_subnet" "ss_subnet_a" {
  vpc_id = "${aws_vpc.star_seeker_vpc.id}"
  cidr_block = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
}

resource "aws_subnet" "ss_subnet_b" {
  vpc_id = "${aws_vpc.star_seeker_vpc.id}"
  cidr_block = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"
}

resource "aws_subnet" "ss_subnet_c" {
  vpc_id = "${aws_vpc.star_seeker_vpc.id}"
  cidr_block = "10.0.3.0/24"
  availability_zone = "${var.aws_region}c"
}

# Internet Gateway
resource "aws_internet_gateway" "ss_internet_gateway" {
  vpc_id = "${aws_vpc.star_seeker_vpc.id}"
}

# Routing Tables
resource "aws_route" "ss_internet_access" {
  route_table_id = "${aws_vpc.star_seeker_vpc.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = "${aws_internet_gateway.ss_internet_gateway.id}"
}

# Security Group LB
resource "aws_security_group" "star_seeker_lb_security_group" {
  name = "star-seeker-loadbalancer-sg"
  description = "Allow traffic to LB"
  vpc_id = "${aws_vpc.star_seeker_vpc.id}"

  ingress {
    from_port   = 80 
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  egress {
    from_port   = 0             
    to_port     = 0             
    protocol    = "-1"          
    cidr_blocks = ["0.0.0.0/0"] 
  }
}

# Security Group ECS Service
resource "aws_security_group" "star_seeker_service_security_group" {
  name = "star-seeker-service-sg"
  description = "Disable direct traffic to service, allow Load Balancer"
  vpc_id = "${aws_vpc.star_seeker_vpc.id}"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    security_groups = ["${aws_security_group.star_seeker_lb_security_group.id}"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Load Balancer
resource "aws_alb" "ss_load_balancer" {
  name = "star-seeker-load-balancer"
  load_balancer_type = "application"
  subnets = [
    "${aws_subnet.ss_subnet_a.id}",
    "${aws_subnet.ss_subnet_b.id}",
    "${aws_subnet.ss_subnet_c.id}"
  ]
  security_groups = ["${aws_security_group.star_seeker_lb_security_group.id}"]
}

# Target Group
resource "aws_lb_target_group" "star_seeker_target_group" {
  name = "star-seeker-target-group"
  port = 80
  protocol = "HTTP"
  target_type = "ip"
  vpc_id = "${aws_vpc.star_seeker_vpc.id}"
  health_check {
    matcher = "200,301,302"
    path = "/"
  }
}

# Load Balancer Listener
resource "aws_lb_listener" "star_seeker_lb_listener" {
  load_balancer_arn = "${aws_alb.ss_load_balancer.arn}"
  port = 80
  protocol = "HTTP"
  default_action {
    type = "forward"
    target_group_arn = "${aws_lb_target_group.star_seeker_target_group.arn}"
  }
}