output "lb_dns" {
  value = "${aws_alb.ss_load_balancer.dns_name}"
  description = "AWS Load Balancer DNS Name"
}