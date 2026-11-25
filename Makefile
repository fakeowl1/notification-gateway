.PHONY: install format check check-deps test-unit test-integration test-load test build run smoke clean

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
	@echo "NFR-2 load test not implemented yet" >&2; exit 1

test:
	npm test

build:
	npm run build

run: build
	GIT_SHA=$(GIT_SHA) node dist/index.js

smoke: build
	@GIT_SHA=$(GIT_SHA) PORT=3999 node dist/index.js & \
	pid=$$!; sleep 1; \
	out=$$(curl -s localhost:3999/version); \
	kill $$pid; \
	echo "$$out"; \
	echo "$$out" | grep -q '"version":"$(GIT_SHA)"'

clean:
	rm -rf dist
