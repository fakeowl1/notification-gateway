---
status: "accepted"
date: 2026-11-23
decision-makers: Roman
---

# Use Valkey and BullMQ for Asynchronous Notification Queue

## Context and Problem Statement

The service must accept HTTP requests to send notifications (Email, Telegram, Discord) and immediately return `202 Accepted` without blocking clients on external API calls. It requires background job processing, delayed retries on transient failures (1, 5, 15 min), and end-to-end propagation of `business-process ID` between the API and workers. This decision affects the `api`, `queue`, and background worker modules.

## Decision Drivers

- Built-in support for delayed retries with configurable backoff intervals.
- Minimal integration complexity in the Node.js / TypeScript stack and fast local setup.
- Job persistence across worker restarts and protection against duplicate processing.

## Considered Options

- Job queue backed by Valkey + BullMQ library
- PostgreSQL table-based queue (`FOR UPDATE SKIP LOCKED` + polling)
- External message broker (RabbitMQ)

## Decision Outcome

Chosen option: "Job queue backed by Valkey + BullMQ library", because it provides out-of-the-box delayed retries, timers, and worker management for Node.js without requiring a custom scheduler or heavy broker setup.

### Consequences

- **Good, because** it significantly reduces background boilerplate code: delayed retries and concurrent processing work out of the box via BullMQ.
- **Neutral, because** it requires passing `business-process ID` explicitly in the job payload to restore the `AsyncLocalStorage` context inside the worker.
- **Bad, because** it adds a separate service (Valkey) to `docker-compose.yml` and enforces a strict write order: persist to PostgreSQL first, then enqueue the job in Valkey.

### Confirmation

Verified by the presence of the `Valkey` service in `docker-compose.yml`, passing smoke/integration tests (`make test`), and log inspection confirming that the HTTP request and background worker share the same `business-process ID`.

## Pros and Cons of the Options

### Job queue backed by Valkey + BullMQ library

- **Good, because** it offers a clean TypeScript API (`Queue`, `Worker`) and built-in backoff strategies for retries.
- **Bad, because** Valkey stores data primarily in memory, meaning PostgreSQL must remain the single source of truth for notification state.

### PostgreSQL table-based queue

- **Good, because** it requires no extra container and allows enqueuing a job within the same database transaction that creates the notification record.
- **Bad, because** it requires implementing custom polling loops, row locking, and retry interval calculations manually.

### External message broker (RabbitMQ)

- **Good, because** it provides durable disk persistence, the standard AMQP protocol, and complex routing across polyglot services.
- **Bad, because** it is overkill for a single Node.js service and lacks simple built-in delayed retries without configuring Dead Letter Exchanges and TTL queues.
