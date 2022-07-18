# Executables (local)
DOCKER_COMPOSE = docker compose -f docker-compose.dev.yml

# Docker containers
NODE_CONTAINER = $(DOCKER_COMPOSE) exec node

# Misc
.DEFAULT_GOAL = help
.PHONY        = help up down logs sh build npm

## —— 🎵 🐳 The Symfony-docker Makefile 🐳 🎵 ——————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Docker 🐳 ————————————————————————————————————————————————————————————————
build: ## Builds the Docker images
	@$(DOCKER_COMPOSE) build --pull --no-cache

up: ## Start the docker hub in detached mode (no logs)
	@$(DOCKER_COMPOSE) up --detach

down: ## Stop the docker hub
	@$(DOCKER_COMPOSE) down --remove-orphans

logs: ## Show live logs
	@$(DOCKER_COMPOSE) logs --tail=0 --follow

sh: ## Connect to the NODE container
	@$(NODE_CONTAINER) sh