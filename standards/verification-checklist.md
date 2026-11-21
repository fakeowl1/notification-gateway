# Verification Checklist

## Automated Checks (Git Hooks)

### Pre-Commit
- [ ] Formatting check passes
- [ ] Linter passes with zero errors
- [ ] Static type check passes
- [ ] Module boundary check passes (no forbidden imports)

### Pre-Push
- [ ] Smoke test passes (app starts, health and send-notification path work)
- [ ] Project build succeeds

## Manual Checks (Before PR)
- [ ] API changes match spec contracts
- [ ] Status transitions follow spec
- [ ] Provider calls have timeouts and defined retry behavior
- [ ] `git diff` is free of secrets, `.env` files, and debug logs
- [ ] Specification and ADRs reflect any contract or architecture changes
