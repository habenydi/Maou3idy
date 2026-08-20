NAME = app

COMPOSE_FILE = infra/docker-compose.yml

all: help

build: ## build the images
	docker compose -p $(NAME) -f $(COMPOSE_FILE) build

up: build ## run the containers
	docker compose -p $(NAME) -f $(COMPOSE_FILE) up -d

down: ## stops all the containers
	docker compose -p $(NAME) -f $(COMPOSE_FILE) down

logs: ## show the logs of the containers
	docker compose -p $(NAME) -f $(COMPOSE_FILE) logs -f 

re: down up ## restart the containers

clean: ## removes all unused Docker resources
	docker system prune -f

volume-clean: ## removes all unused Docker volumes
	docker volume prune -f

hard-clean: ## removes everything (containers, images, volumes, networks)
	@docker stop $$(docker ps -qa) || true
	@docker rm $$(docker ps -qa) || true
	@docker rmi -f $$(docker images -qa) || true
	@docker volume rm $$(docker volume ls -q) || true
	@docker network rm $$(docker network ls -q) 2>/dev/null || true

help: ## show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_.-]+[^:]*:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sed 's/:.*//'

# Note: Added 'help' to .PHONY, and removed 'fclean' since it wasn't defined in your file
.PHONY: all build up down re clean volume-clean hard-clean help