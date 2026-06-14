# Variables
COMPOSE = docker compose
APP = npm run start:dev

all: build

ins:
	touch .env
	cp .env.example .env
	npm i
	npx prisma generate

build: ins
	$(COMPOSE) up -d
	@echo "PostgreSQL is running..."
	npx prisma migrate dev --name init
	$(APP)

down:
	$(COMPOSE) down

restart: down up

logs:
	$(COMPOSE) logs -f

clean:
	npx prisma migrate reset
	$(COMPOSE) down -v