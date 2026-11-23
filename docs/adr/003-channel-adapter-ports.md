---
status: "proposed"
date: 2026-11-22
decision-makers: Roman
---

# Isolate Email, Telegram, and Discord behind channel adapter ports defined in core

## Context and Problem Statement

Each provider has its own API, payload format, error codes, and rate limits, and these change over time. If business logic calls provider SDKs directly, every provider change leaks into lifecycle and retry code. Affected modules: `core` (ports), `adapters`, `queue`/workers.

## Decision Drivers

- Business rules in `core` independent of third-party SDKs
- Provider formatting and error mapping changes stay local
- Easy testing with fake adapters
- Dependency rules enforceable by tooling

## Considered Options

- Ports (interfaces) in `core`, implemented by separate adapters
- Call provider SDKs directly from the worker/`core`
- One generic HTTP adapter configured per channel

## Decision Outcome

Chosen option: "Ports in `core`, implemented by adapters", because it keeps `core` free of external SDKs and confines formatting drift and error mapping to one module per provider.

A port exposes a single operation (send a message, return provider message ID or a mapped error: retryable such as `429`/`5xx`/timeout, or permanent). Adapters depend only on `core` (ports) and `shared`; `api` never imports `adapters`; adapters never import each other or `queue`.

### Consequences

- **Good, because** providers can be swapped or mocked without touching `core`.
- **Good, because** the rules are checkable automatically.
- **Neutral, because** adding a new channel means a new adapter plus a small registration step.
- **Bad, because** the extra abstraction adds files and mapping code for a small number of channels.

### Confirmation

- `make check-deps` (import boundary linter in pre-commit and CI) fails on forbidden imports.
- Unit tests run `core` with a fake adapter.
- Audit step: review the top-3 unnecessary or wrong dependencies against this ADR.

## Pros and Cons of the Options

### Ports in core, implemented by adapters

- **Good, because** clean boundaries; testable; provider changes are local.
- **Bad, because** more boilerplate.

### Direct SDK calls from worker/core

- **Good, because** least code at the start.
- **Bad, because** couples business logic to SDKs and makes tests depend on network or heavy mocks.

### One generic HTTP adapter

- **Good, because** fewer classes.
- **Bad, because** channel-specific formatting and error semantics end up in configuration or conditionals, and Email (SMTP) is not plain HTTP.
