# Variables
COMPOSE = docker compose
APP = npm run start:dev

up:
	$(COMPOSE) up -d
	@echo "PostgreSQL is running..."
	$(APP)

ins:
	npm i
	npx prisma generate
down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f

clean:
	$(COMPOSE) down -v

build:
	$(COMPOSE) up -d --build