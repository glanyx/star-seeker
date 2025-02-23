
# ECR
resource "aws_ecr_repository" "star_seeker_webapp_ecr" {
  name = "star-seeker-next-app"
}

# ECS Cluster
resource "aws_ecs_cluster" "star_seeker_webapp_cluster" {
  name = "star-seeker-cluster"
}

# Task Definition
resource "aws_ecs_task_definition" "star_seeker_webapp_task" {
  family = "star-seeker-nextjs-task"
  requires_compatibilities = ["FARGATE"]
  network_mode = "awsvpc"
  memory = 512
  cpu = 256
  execution_role_arn = "${aws_iam_role.ss_ecs_role.arn}"

  container_definitions = <<EOT
  [
    {
      "name": "star-seeker-nextjs-container",
      "image": "${aws_ecr_repository.star_seeker_webapp_ecr.repository_url}:latest",
      "memory": 512,
      "cpu": 256,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000
        }
      ],
      "environment": [
        {
          "name": "NEXT_PUBLIC_API_URL",
          "value": "${var.api_url}"
        },
        {
          "name": "NEXT_PUBLIC_X_API_KEY",
          "value": "${var.api_key}"
        }
      ]
    }
  ]
  EOT
}

# Service
resource "aws_ecs_service" "star_seeker_service" {
  name = "star-seeker-service"
  cluster = "${aws_ecs_cluster.star_seeker_webapp_cluster.id}"
  task_definition = "${aws_ecs_task_definition.star_seeker_webapp_task.arn}"
  launch_type = "FARGATE"
  desired_count = 3

  load_balancer {
    container_name = "star-seeker-nextjs-container"
    container_port = 3000
    target_group_arn = "${aws_lb_target_group.star_seeker_target_group.arn}"
  }

  network_configuration {
    assign_public_ip = true
    subnets = ["${aws_subnet.ss_subnet_a.id}", "${aws_subnet.ss_subnet_b.id}", "${aws_subnet.ss_subnet_c.id}"]
    security_groups = ["${aws_security_group.star_seeker_service_security_group.id}"]
  }
}