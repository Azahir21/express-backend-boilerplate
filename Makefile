.PHONY: help build up down logs shell migrate seed clean dev prod

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Targets:'
    @awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the Docker image
	docker-compose build

up: ## Start the application in production mode
	docker-compose up -d

down: ## Stop the application
	docker-compose down

logs: ## View application logs
	docker-compose logs -f app

shell: ## Access the application container shell
	docker-compose exec app sh

migrate: ## Run database migrations
	docker-compose exec app npx prisma migrate deploy

seed: ## Seed the database
	docker-compose exec app npm run db:seed

clean: ## Clean up Docker resources
	docker-compose down -v
	docker system prune -f

dev: ## Start the application in development mode
	docker-compose -f docker-compose.dev.yml up

dev-build: ## Build and start the application in development mode
	docker-compose -f docker-compose.dev.yml up --build

prod: ## Start the application in production mode
	docker-compose up -d

status: ## Show running containers
	docker-compose ps