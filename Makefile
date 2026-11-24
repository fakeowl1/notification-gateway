.PHONY: install format check test build run up down clean

GIT_SHA := $(shell git rev-parse --short HEAD 2>/dev/null || echo "dev")

install:
	npm ci

format:
	npm run format

check:
	npm run check

test:
	npm test

build:
	npm run build

run: build
	GIT_SHA=$(GIT_SHA) node dist/index.js

clean:
	rm -rf dist
