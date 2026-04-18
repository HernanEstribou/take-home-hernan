# Backend Challenge

## Notification management system for authenticated users.

The system allows each user to manage and send notifications through various channels.

## App running on Heroku

- [SWAGGER](https://take-home-hernan-436970d63328.herokuapp.com/api-docs/)

## Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/HernanEstribou/take-home-hernan/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/HernanEstribou/take-home-hernan/tree/master)

[![Coverage Status](https://coveralls.io/repos/github/HernanEstribou/take-home-hernan/badge.svg)](https://coveralls.io/github/HernanEstribou/take-home-hernan)

## Features

### 1. User Authentication

- User registration with email and password.
- Login endpoint that returns an access token.
- Endpoints require a valid access token.

### 2. Notification Management

- Create notifications (fields: **title**, **content**, **channel**).
- Edit existing notifications.
- Delete notifications.
- View all notifications created by the authenticated user.

### 3. Notification Sending

- Every time a notification is created, it is automatically sent through the selected channel.
- Supported delivery channels:
  - **Email**
  - **SMS**
  - **Push Notification**

## Techs

- Node: 18.20.7
- Express: 5.2.1
- Prisma: 6.19.2
- Postgres: 14.20-trixie

## Route

- Local (Node): [API Swagger](http://localhost:3000/api-docs/)
- Local (Docker): [API Swagger](http://localhost:5173/api-docs/)
- Production (Heroku): [API Swagger](https://take-home-hernan-436970d63328.herokuapp.com/api-docs/)

## Pre-Requisites

- Docker installed
- Docker Compose installed
- Ports free: **5173**, **5432** (app) and **5433** (test DB)
- Env vars should be defined. To find an example of the values you can use `.env.example`

## How to run the app

**Linux / Git Bash**

```bash
chmod 711 ./up_dev.sh
./up_dev.sh
```

**Windows (PowerShell)**

```powershell
.\up_dev.ps1
```

## How to run the tests

**Linux / Git Bash**

```bash
chmod 711 ./run_tests.sh
./run_tests.sh
```

**Windows (PowerShell)**

```powershell
.\run_tests.ps1
```

## Decisions made

- Express — Chosen for its simplicity and flexibility. Since the project scope is focused on a specific domain (notifications), the overhead of a full framework like NestJS was unnecessary.

- Prisma ORM — Chosen over raw SQL or alternatives like Sequelize because of its type-safe query builder, auto-generated client, and first-class migration tooling. It also makes schema changes traceable via version-controlled migration files.

- PostgreSQL — Relational database chosen to model the user → notification → delivery ownership chain with proper foreign key constraints and referential integrity.

- Joi for validation — Chosen for its declarative schema syntax and rich set of validators. Validation is handled at the DTO layer before reaching the service, keeping business logic clean.

- Strategy Pattern for notification channels — Applying the Strategy Pattern allows adding new delivery channels (WhatsApp, Slack, etc.) without modifying existing service code.

- Docker Compose — Two separate Compose files (compose.yaml for dev, docker-compose.test.yml for tests) to isolate environments and avoid test runs interfering with the development database.

- Jest + integration tests — Jest was chosen as it is the most widely used JS testing framework. Integration tests were favored over unit tests for controllers because they validate the full request/response cycle against a real database, catching issues that mocked unit tests would miss.

- CircleCI + Coveralls — CircleCI for automated test runs on every push, with Coveralls to track coverage trends over time.

## Future Improvements

### Error Handling & API Responses

- Inconsistent error response format — Auth uses { error: "..." } while users and notifications use { message: "..." }. Should be unified.
- No global error handler middleware — Each route has its own try/catch. A centralized Express error handler would reduce duplication.

### Security

- JWT token expiration (1h) is hardcoded — Should be configurable via environment variable.
- No rate limiting — Login endpoint is vulnerable to brute force attacks.
- No password strength validation — Any string is accepted as password.

### Architecture

- Add new notification channels to demonstrate scalability of the Strategy Pattern.
- No pagination — GET /notifications/:id and GET /users return all records with no limit.
