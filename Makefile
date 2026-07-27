NAME = app

COMPOSE_FILE = infra/docker-compose.yml

all: up

build:
	docker-compose -p $(NAME) -f $(COMPOSE_FILE) build

up: build
	docker-compose -p $(NAME) -f $(COMPOSE_FILE) up -d 

down:
	docker-compose -p $(NAME) -f $(COMPOSE_FILE) down

re: down up

clean:
	docker system prune -f

volume-clean:
	docker volume prune -f

hard-clean:
	docker stop $$(docker ps -qa); \
	docker rm $$(docker ps -qa); \
	docker rmi -f $$(docker images -qa); \
	docker volume rm $$(docker volume ls -q); \
	docker network rm $$(docker network ls -q) 2>/dev/null

.PHONY: all build up down re clean fclean
