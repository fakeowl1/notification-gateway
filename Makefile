.PHONY: install format check check-deps test-unit test-integration test-load test build run up down clean

GIT_SHA := $(shell git rev-parse --short HEAD 2>/dev/null || echo "dev")

install:
	npm ci

format:
	npm run format

check:
	npm run check

check-deps:
	npm run check-deps

test-unit:
	npm test

test-integration:
	npm test

test-load:
	@echo "Load test target is not implemented"

test:
	npm test

build:
	npm run build

run: build
	GIT_SHA=$(GIT_SHA) node dist/index.js

clean:
	rm -rf dist
