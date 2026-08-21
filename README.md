*This project has been created as part of the 42 curriculum by yaait-am, bamezoua, habenydi, ybounite, imeftah.*

> ⚠️ `yaait-am` and `bamezoua` are confirmed 42 intra logins. `habenydi` and `ybounite` are this team's GitHub usernames, not verified intra logins — swap in the real ones before submission if they differ. `imeftah` designed the platform (UI/UX) rather than committing code, so they won't show up in `git log` — keep them in the credit line regardless, design is part of the project.

# Maou3idy

A microservices web platform for booking, managing and reviewing doctor appointments — patients search doctors, book and manage appointments in real time, and leave reviews; doctors manage their schedule, services and patients; admins moderate the whole platform.

## Description

Maou3idy ("my appointment") turns the classic ft_transcendence brief into a **healthcare booking system** — the subject explicitly allows this (see "Productivity and Tools → Booking System" in the module catalog: *"Reserve resources (rooms, equipment, appointments), calendar, and notifications"*).

Three roles share the platform:

- **Patients** register, search doctors by specialty/location, book an available slot, get reminded before their appointment, and leave a rating + review once it's completed.
- **Doctors** apply for verification (with a medical license upload), get approved by an admin, then manage their working hours/slots, services, and patient appointments from a dashboard.
- **Admins** verify or reject doctor applications, manage users (promote/ban/disable/delete), and watch platform activity (audit logs, registration trends, appointment volume) from an analytics dashboard.

Under the hood it's a genuine microservices system: five independently deployable services behind a single reverse proxy, communicating over both synchronous HTTP (via a gateway) and asynchronous events (via RabbitMQ) — not a monolith split into folders.

## Instructions

### Prerequisites

- Docker + Docker Compose (or Podman with compose compatibility)
- `make`
- A Google OAuth client ID/secret if you want "Sign in with Google" to work (optional — email/password auth works without it)

### Run it

```bash
git clone <this-repo-url>
cd ft_transcendence.1337

# 1. create every service's .env from its .env.example (only fills in files that don't exist yet)
make env

# 2. edit the generated .env files — at minimum set real values for:
#    apps/auth/.env        -> DATABASE_URL, JWT secrets, GOOGLE_CLIENT_ID/SECRET, mail creds
#    apps/auth/.db.env      apps/slots/.db.env   -> Postgres user/password/db name
#    apps/api-gateway/.env -> NGINX_URL, AUTH_SERVICE_URI, APPOINTMENT_SERVICE_URI
#    apps/frontend/.env     -> NEXT_PUBLIC_URL, INTERNAL_API_URL

# 3. build and start every container
make up
```

That's it — one command (`make up`) builds and starts all nine containers (nginx, api-gateway, frontend, auth + auth_db, slots + slots_db, notification, rabbitmq).

The app is then reachable at **http://localhost:8000**.

### Other Makefile targets

| Target | What it does |
|---|---|
| `make env` | Copies every `*.env.example` to `*.env` (skips files that already exist) |
| `make build` | Builds all images without starting them |
| `make up` | Builds (if needed) and starts everything, detached |
| `make down` | Stops and removes all containers |
| `make re` | `down` then `up` |
| `make logs` | Tails logs for every service |
| `make clean` / `make volume-clean` / `make hard-clean` | Prune unused Docker resources, volumes, or everything (containers/images/volumes/networks) |

### Seeding an admin account

The `auth` service seeds one admin account on startup from `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` in `apps/auth/.env`, and emits an event so the `slots` service creates the matching record — set those three variables before first boot if you want an admin ready immediately.

## Resources

- [NestJS documentation](https://docs.nestjs.com/)
- [Next.js documentation](https://nextjs.org/docs)
- [Prisma documentation](https://www.prisma.io/docs)
- [Spring Cloud Gateway documentation](https://spring.io/projects/spring-cloud-gateway)
- [RabbitMQ tutorials](https://www.rabbitmq.com/tutorials)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)

### AI usage disclosure

Claude (Anthropic's Claude Code) was used throughout this project as a coding assistant: diagnosing and fixing bugs (CORS/gateway misconfiguration, OAuth redirect chain, a Next.js Server Component crash, a competing-consumers RabbitMQ bug, an IDOR in the review endpoint, a PII leak in the public doctor-profile endpoint), building the review feature end-to-end (backend DTO/service/controller + frontend UI), and producing this README and the accompanying `test.md` compliance review. All AI-assisted changes were reviewed and verified against the running stack (real HTTP calls and, where cookie-based auth mattered, real authenticated browser sessions) rather than accepted blind.

## Team Information

| Login | Name | Primary area |
|---|---|---|
| yaait-am | Yassir Ait Ammi | Backend (auth/reviews/notifications), infra/Docker, gateway CORS & networking, integration debugging |
| bamezoua | Bouhcine Amezouar | *(fill in — not detailed in commit history alone)* |
| habenydi | Hassan Benydir | Slots/appointments service, env & compose updates, register-flow fixes |
| ybounite | Youssef Bounite | *(fill in — not detailed in commit history alone)* |
| imeftah | *(full name)* | Platform design (UI/UX) — the Tailwind design system and page layouts implemented across the frontend are based on their designs |

> The area column beyond `yaait-am` is inferred only from branch/PR names (`feature/update_slots`, `feature/register-error`, `feature/compose-and-env-updates`, `feature/doctor-services`, `feature/https`) — each teammate should correct their own row and add what they actually owned.

## Project Management

- **Workflow:** feature branches off `development`, merged back via pull requests (`feature/add-review`, `feature/https`, `feature/slots`, `feature/register-error`, `feature/doctor-services`, …) rather than committing straight to `development`.
- **Task splitting:** by service/domain — one service (auth, slots, gateway, frontend) tends to have one primary owner per feature branch, verified against the actual PR history rather than assumed.
- *(Add whatever planning tool was actually used — Trello/Notion/GitHub Projects/a shared doc — and the team's meeting cadence, if any: this is information only the team has.)*

## Technical Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 16 (App Router) + React 19 + Tailwind CSS v4 | App Router gives real server components where it matters (admin pages fetch server-side), Tailwind keeps a consistent design-token system across ~45 routes without hand-rolled CSS |
| Auth/Reviews/Notifications service | NestJS 11 + Prisma + Postgres | class-validator DTOs give backend input validation for free, Prisma keeps the schema and migrations explicit |
| Slots/Appointments service | NestJS 11 + Prisma + Postgres | Isolated database (`slots_db`) so booking-domain writes never contend with the auth domain |
| Notification service | NestJS 11 microservice (RabbitMQ transport only, no HTTP) | Pure event consumer — decouples "something happened" from "who needs to know about it" |
| API Gateway | Java 21 + Spring Cloud Gateway (WebMVC) | Single entry point for routing + CORS policy + service-availability checks, independent of the Node services' runtime |
| Messaging | RabbitMQ, topic exchange (`domain_events`), one queue per consuming service | Lets `auth`, `slots`, and `notification` each react to the same event (e.g. `appointment.completed`) without polling or direct service-to-service calls |
| Reverse proxy | nginx | Single public entrypoint (port 8000), routes `/` to the frontend and `/api` to the gateway |
| Auth | JWT (httpOnly cookie) + Google OAuth 2.0 (Passport) | Stateless auth that still supports a social-login path |
| File storage | Cloudinary | Avatars and doctor medical-license documents, no local disk state to manage across containers |
| Containerization | Docker Compose, one `Makefile` entrypoint | Whole 9-container stack reproducible with `make up` |

## Database Schema

Two separate Postgres databases, one per owning service (this is the microservices boundary — no service reaches into another's tables directly; cross-service consistency is handled by RabbitMQ events, e.g. `doctor.updated`).

**`auth_db`** (owned by the `auth` service)
- `User` — email/password (bcrypt), role (`USER`/`DOCTOR`/`ADMIN`/`PENDING_DOCTOR`/`REJECTED`/`BANNED`), profile fields
- `Doctor` — 1:1 with `User`, specialty, bio, license info, rating/reviewCount/score, verified flag
- `DoctorLocation` — 1:many with `Doctor`
- `DoctorPatient` — join table tracking which patients a doctor has seen
- `Review` — 1 per (doctor, patient) pair, rating 1–5 + optional comment, enforced by upsert-on-conflict rather than allowing duplicates
- `Notification` — per-user, title/message/isRead, fed by RabbitMQ events from every service
- `Auditlog` — admin/doctor/patient action trail
- `UserStats` / `Stats` — per-user and platform-wide counters surfaced on the analytics dashboards

**`slots_db`** / `nest_db` (owned by the `slots` service)
- `User`, `Doctor` — thin mirrors of the auth-owned records, kept in sync via events, so booking logic never needs a cross-service call on the hot path
- `Category`, `Service` — what a doctor offers and how long/what it costs
- `Slots` — a doctor's bookable time windows
- `Appointment` — an actual booking made against a slot/service, status-tracked (`PENDING`/`CONFIRMED`/`COMPLETED`/`CANCELED`)

Booking correctness under concurrency is handled with a conditional `updateMany` (claim only if still free) instead of read-then-write, so two patients racing for the same slot can't both win it.

## Features List

| Feature | Owner (service) |
|---|---|
| Email/password + Google OAuth 2.0 login, JWT cookie sessions | `auth` |
| Role-based access control (patient/doctor/admin) with an admin panel to promote/ban/disable/delete users | `auth` + `frontend/app/admin` |
| Doctor application + admin verification workflow (license upload via Cloudinary) | `auth`/`doctor` + `frontend/app/(auth)/doctor-register` |
| Doctor search with specialty/location filters, pagination, and a scoring formula (rating + patient volume + experience) | `auth`/`doctor` |
| Slot-based appointment booking with race-safe double-booking prevention | `slots` |
| Doctor schedule/service/category management | `slots` + `frontend/app/doctor` |
| Appointment reminders and status-change notifications | `slots` → RabbitMQ → `notification` |
| Post-appointment rating + review, with live doctor rating recalculation | `auth/review` + `frontend/app/appointments`, `app/booking` |
| In-app notification center | `auth/notification` + `frontend/app/notification` |
| Admin analytics dashboard — server-rendered stats, a live-polling "Platform Pulse" section, registration-trend chart with CSV export | `auth` + `frontend/app/admin/dashboard` |
| Privacy Policy / Terms of Service pages | `frontend/app/privacy-policy`, `app/terms-of-service` |

*(Each teammate: replace the service-level attribution above with your actual name where you were the one who built it — the subject wants named individual ownership, not just "which service".)*

## Modules

Point math and honest status for each — see [`test.md`](./test.md) for the full evidence behind every row; only claim what's actually verifiable in the code.

| Module | Type | Pts | Status |
|---|---|---|---|
| Use a framework/library, frontend and backend | Major | 2 | ✅ Done |
| Use an ORM (Prisma) | Minor | 1 | ✅ Done |
| Backend built as microservices | Major | 2 | ✅ Done |
| OAuth 2.0 (Google) | Minor | 1 | ✅ Done |
| Advanced user permissions (RBAC + admin panel) | Major | 2 | ✅ Done |
| File upload system (Cloudinary) | Minor | 1 | ✅ Done |
| Advanced search with filters, sort & pagination | Minor | 1 | ✅ Done |
| Custom design system (10+ reusable components) | Minor | 1 | ✅ Done |
| Complete notification system (create/update/delete) | Minor | 1 | ✅ Done |
| Server-side rendering | Minor | 1 | ✅ Done |
| Data analytics dashboard with visualization | Major | 2 | ✅ Done |
| **Total claimed** | | **15** | |

**Past the 14-point minimum**, but treat this as headroom, not a finish line — the mandatory part (especially HTTPS, currently not implemented — see `test.md` §2) decides pass/fail regardless of module count. **Do not** claim real-time/WebSockets, the public API module, or Prometheus+Grafana — `socket.io` is an installed-but-unwired dependency, and there is no API-key/rate-limited public API or Prometheus/Grafana container in this repo (see `test.md` §3 for the exact evidence).

## Individual Contributions

*(To be filled in by each teammate — the subject asks for this explicitly and by name, and it can't be inferred reliably from commit counts alone. A starting point from `git log --all --format='%an' | sort | uniq -c`: yaait-am is the most active committer by far, followed by habenydi, bamezoua, and ybounite. imeftah won't appear in that list at all since their contribution was design work, not code — list it anyway: the visual design (layout, component look, the whole Tailwind design-token system the frontend implements) originated with them. Turn all of this into a real per-person list of what each of you actually built, designed, debugged, or reviewed.)*
