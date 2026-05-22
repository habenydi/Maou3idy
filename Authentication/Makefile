# Variables
COMPOSE = docker compose
APP = npm run start:dev

up:
	$(COMPOSE) up -d
	@echo "PostgreSQL is running..."
	npx prisma migrate dev --name init
	$(APP)

ins:
	touch .env
	cp .env.example .env
	npm i
	npx prisma generate
down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f

clean:
	npx prisma migrate reset
	$(COMPOSE) down -v

build:
	$(COMPOSE) up -d --build