# Threat Model — plc4easy-demo

**Scope:** Phase 1 backend API (authentication + device endpoints)  
**Date:** 2026-04-13  
**Version:** 0.1.0

---

## 1. Assets

| Asset | Description | Sensitivity |
|---|---|---|
| Admin credentials | Email + bcrypt hash stored in env vars | High |
| JWT secret | Used to sign all access tokens | Critical |
| Device list | In-memory demo data | Low (demo) |
| JWT tokens | Short-lived access tokens issued to clients | Medium |

---

## 2. Main Threats

### T1 — Credential Brute Force
An attacker submits repeated login attempts against `POST /auth/login` to guess the admin password.

### T2 — JWT Secret Compromise
If the `JWT_SECRET` environment variable is leaked (e.g., committed to source control, logged), an attacker can forge arbitrary tokens.

### T3 — Token Replay / Theft
A valid JWT intercepted in transit or from a client log can be reused until it expires.

### T4 — Mass Assignment / Payload Injection
A client submits unexpected fields in request bodies to manipulate application state.

### T5 — Information Disclosure via Error Messages
Verbose error messages could reveal implementation details (stack traces, DB queries) to attackers.

---

## 3. Current Mitigations

| Threat | Mitigation |
|---|---|
| T1 — Brute force | `bcrypt` with cost factor 12 makes each comparison ~300 ms, slowing bulk attempts |
| T1 — Credential enumeration | `UnauthorizedException` is returned regardless of whether the email or password is wrong (no oracle) |
| T2 — Secret leakage | `JWT_SECRET` is loaded from `.env`, which is listed in `.gitignore` and never hardcoded |
| T3 — Token replay | Tokens expire after 1 hour (`expiresIn: '1h'`) |
| T4 — Mass assignment | Global `ValidationPipe` with `whitelist: true` strips unknown fields; `forbidNonWhitelisted: true` rejects any request containing them |
| T4 — Payload validation | DTOs enforce field types, min/max lengths, and format constraints via `class-validator` |
| T5 — Error leakage | NestJS default exception filter returns clean error shapes without stack traces in production |

---

## 4. Future Improvements

| Priority | Improvement |
|---|---|
| High | Add rate limiting on `/auth/login` (e.g., `@nestjs/throttler`) |
| High | Add HTTPS / TLS termination in production deployment |
| High | Replace in-memory admin user with a proper user store and per-user bcrypt hashes |
| Medium | Implement JWT refresh token rotation with revocation list |
| Medium | Add structured logging with a correlation ID (never log tokens or PII) |
| Medium | CORS policy: restrict allowed origins to known clients |
| Low | Add helmet.js for security-related HTTP response headers |
| Low | Add audit log for failed login attempts |

---

## 5. Out of Scope (Phase 1)

- Database security (no DB in Phase 1)
- Frontend / CORS in depth
- Multi-tenant isolation
- Kubernetes / container security
