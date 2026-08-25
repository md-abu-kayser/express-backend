# Express Backend — Production-Grade REST API

<p align="center">
  <strong>Scalable • Secure • Modular • Type-Safe • Production-Ready</strong>
</p>

<p align="center">
  A production-oriented REST API built with
  <strong>Node.js, Express 5, TypeScript, Prisma, PostgreSQL, JWT, and Zod</strong>.
</p>

<p align="center">
  <a href="https://github.com/md-abu-kayser/express-backend">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 20+" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

---

## Overview

`express-backend` is a modular, maintainable REST API designed around real-world backend engineering practices.

The project demonstrates how to structure an Express application for long-term maintainability while keeping business logic, HTTP concerns, validation, authentication, database access, and error handling clearly separated.

The architecture is designed to make the codebase:

- Easy to understand
- Easy to test
- Easy to extend
- Safe to refactor
- Suitable for team development
- Ready for production-oriented deployment

---

## Engineering Principles

This project follows a set of backend engineering principles rather than simply implementing CRUD endpoints.

### Separation of Concerns

Each responsibility has a dedicated layer.

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Prisma / Database
```

This keeps HTTP handling separate from business logic and persistence logic.

### Feature-Based Modularity

Features are grouped by domain instead of creating large global folders.

```text
modules/
├── users/
├── products/
└── orders/
```

Adding a new feature should require adding a new module instead of modifying unrelated code throughout the application.

### Fail Fast

Invalid requests are rejected as early as possible through centralized validation.

### Centralized Error Handling

Known application errors and unexpected runtime errors are normalized through a single error-handling layer.

### Type Safety

TypeScript and Prisma provide compile-time guarantees across application code and database access.

---

# Architecture

## High-Level Request Flow

```mermaid
flowchart TD
    A[Client] --> B[Express Server]
    B --> C[Security Middleware]
    C --> D[Request Validation]
    D --> E[Authentication / Authorization]
    E --> F[Route]
    F --> G[Controller]
    G --> H[Service]
    H --> I[Prisma ORM]
    I --> J[(PostgreSQL)]
    J --> I
    I --> H
    H --> G
    G --> K[Response]
    K --> A
```

## Layer Responsibilities

| Layer         | Responsibility                                     |
| ------------- | -------------------------------------------------- |
| Routes        | Define HTTP endpoints                              |
| Middleware    | Authentication, authorization, validation, logging |
| Controllers   | Translate HTTP requests into service calls         |
| Services      | Implement business rules                           |
| Prisma        | Database access and type-safe queries              |
| Schemas       | Validate external input                            |
| Error Handler | Normalize application errors                       |
| Logger        | Capture structured application events              |

---

# Project Structure

```text
express-backend/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── database/
│   │   └── prisma.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── logger.middleware.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── users/
│   │   │   ├── user.route.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.schema.ts
│   │   │   └── user.types.ts
│   │   │
│   │   ├── products/
│   │   │   ├── product.route.ts
│   │   │   ├── product.controller.ts
│   │   │   ├── product.service.ts
│   │   │   ├── product.schema.ts
│   │   │   └── product.types.ts
│   │   │
│   │   └── orders/
│   │       ├── order.route.ts
│   │       ├── order.controller.ts
│   │       ├── order.service.ts
│   │       ├── order.schema.ts
│   │       └── order.types.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── logger.ts
│   │   └── errors.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
├── tsconfig.json
└── README.md
```

> The exact structure may evolve as the project grows, but the architectural boundary should remain consistent.

---

# Core Features

## Authentication

The API implements JWT-based authentication with:

- Access tokens
- Refresh tokens
- Protected routes
- Token verification middleware
- User identity extraction
- Role-based authorization

Example authentication flow:

```text
Login
  ↓
Validate credentials
  ↓
Generate access token
  ↓
Generate refresh token
  ↓
Return token pair
```

---

## Role-Based Access Control

Supported roles:

```text
ADMIN
CUSTOMER
```

Authorization is enforced at the middleware layer.

Example:

```text
CUSTOMER
├── View products
├── Create orders
├── View own orders
└── View own profile

ADMIN
├── All customer capabilities
├── Create products
├── Update products
├── Delete products
└── View all orders
```

---

## Request Validation

All external input should be validated before reaching business logic.

Validation covers:

- Request body
- Query parameters
- Route parameters

Zod provides runtime validation while TypeScript provides compile-time type safety.

Example:

```ts
const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
});
```

---

# Security

The application follows common API security practices.

### Security Middleware

- Helmet
- CORS
- Controlled JSON parsing
- JWT verification
- Role-based authorization
- Input validation
- Centralized error handling

### Security Rules

Sensitive configuration should never be committed to Git.

```text
.env
.env.local
.env.production
```

Use:

```text
.env.example
```

for documentation and onboarding.

---

# API Design

The API uses versioned routes:

```text
/api/v1
```

This provides a clear migration path for future API versions.

---

# API Reference

## System

| Method | Endpoint  | Description  |
| ------ | --------- | ------------ |
| `GET`  | `/health` | Health check |

---

## Authentication

| Method | Endpoint                 | Auth     | Description          |
| ------ | ------------------------ | -------- | -------------------- |
| `POST` | `/api/v1/users/register` | Public   | Register user        |
| `POST` | `/api/v1/users/login`    | Public   | Login                |
| `POST` | `/api/v1/users/refresh`  | Public   | Refresh access token |
| `GET`  | `/api/v1/users/profile`  | Required | Get current profile  |

---

## Products

| Method   | Endpoint               | Role   | Description    |
| -------- | ---------------------- | ------ | -------------- |
| `GET`    | `/api/v1/products`     | Public | List products  |
| `GET`    | `/api/v1/products/:id` | Public | Get product    |
| `POST`   | `/api/v1/products`     | ADMIN  | Create product |
| `PUT`    | `/api/v1/products/:id` | ADMIN  | Update product |
| `DELETE` | `/api/v1/products/:id` | ADMIN  | Delete product |

---

## Orders

| Method | Endpoint             | Role       | Description    |
| ------ | -------------------- | ---------- | -------------- |
| `POST` | `/api/v1/orders`     | CUSTOMER   | Create order   |
| `GET`  | `/api/v1/orders/my`  | CUSTOMER   | Get own orders |
| `GET`  | `/api/v1/orders/all` | ADMIN      | Get all orders |
| `GET`  | `/api/v1/orders/:id` | Authorized | Get order      |

---

# Example Request

## Create Product

```http
POST /api/v1/products
Authorization: Bearer <access-token>
Content-Type: application/json
```

```json
{
  "name": "Mechanical Keyboard",
  "price": 89.99,
  "stock": 25
}
```

Example response:

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "product-id",
    "name": "Mechanical Keyboard",
    "price": 89.99,
    "stock": 25
  }
}
```

---

# Error Handling

The API uses centralized error handling to provide consistent responses.

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "price",
      "message": "Price must be a positive number"
    }
  ]
}
```

This allows frontend applications and API consumers to handle failures consistently.

---

# Database

Prisma is used as the database abstraction layer over PostgreSQL.

Typical workflow:

```text
Prisma Schema
      ↓
Migration
      ↓
PostgreSQL
      ↓
Generated Prisma Client
      ↓
Application Service
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Create and apply migrations:

```bash
npm run prisma:migrate
```

Seed development data:

```bash
npm run prisma:seed
```

---

# Environment Configuration

Create a `.env` file:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE

JWT_SECRET=replace-with-a-secure-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Recommended Production Practices

Never hard-code:

- Database credentials
- JWT secrets
- API keys
- Private tokens
- Cloud provider credentials

Use the environment or a dedicated secrets manager.

---

# Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js 20+
- npm
- PostgreSQL
- Git

Verify:

```bash
node --version
npm --version
psql --version
git --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/md-abu-kayser/express-backend.git
```

Enter the project:

```bash
cd express-backend
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate
```

Seed the database:

```bash
npm run prisma:seed
```

Start development mode:

```bash
npm run dev
```

The API should now be available at:

```text
http://localhost:3000
```

---

# Available Scripts

| Command                   | Purpose                      |
| ------------------------- | ---------------------------- |
| `npm run dev`             | Start development server     |
| `npm run build`           | Build production application |
| `npm start`               | Start compiled application   |
| `npm test`                | Run test suite               |
| `npm run lint`            | Run ESLint                   |
| `npm run format`          | Format source code           |
| `npm run prisma:generate` | Generate Prisma Client       |
| `npm run prisma:migrate`  | Run Prisma migration         |
| `npm run prisma:seed`     | Seed database                |

---

# Testing

The project is structured to support automated API testing using:

- Jest
- Supertest

Typical test coverage should include:

```text
Authentication
├── Registration
├── Login
├── Refresh token
└── Protected routes

Users
├── Profile access
└── Authorization

Products
├── Create
├── Read
├── Update
└── Delete

Orders
├── Create
├── Read own orders
├── Read single order
└── Admin access
```

Run tests:

```bash
npm test
```

---

# Development Workflow

A recommended development workflow:

```text
Feature Request
      ↓
Define Domain
      ↓
Create Module
      ↓
Define Validation
      ↓
Implement Service
      ↓
Implement Controller
      ↓
Register Route
      ↓
Add Tests
      ↓
Run Lint + Tests
      ↓
Commit
      ↓
Pull Request
```

Example commit:

```text
feat(products): add product creation endpoint
```

---

# Code Quality Standards

The project is designed around maintainable engineering practices:

- Strict TypeScript
- Explicit module boundaries
- Small focused functions
- Centralized error handling
- Reusable middleware
- Runtime request validation
- Predictable response structures
- Environment-based configuration
- Automated testing
- Consistent formatting
- Linting before merge

---

# Production Readiness Checklist

Before deploying to production, review:

```text
[ ] Production database configured
[ ] Secure JWT secrets configured
[ ] CORS restricted to trusted origins
[ ] Environment variables secured
[ ] Logging configured
[ ] Error responses reviewed
[ ] Database migrations verified
[ ] Automated tests passing
[ ] Linting passing
[ ] Build passing
[ ] HTTPS enabled
[ ] Reverse proxy configured
[ ] Health endpoint available
[ ] Monitoring configured
```

---

# Scalability Strategy

The architecture is intentionally designed so additional domains can be added without restructuring the entire application.

For example:

```text
modules/
├── users/
├── products/
├── orders/
├── payments/
├── notifications/
├── reviews/
└── analytics/
```

The same module boundary can continue to be used as the system grows.

---

# Future Improvements

Potential production enhancements include:

- Redis caching
- Rate limiting
- Background jobs
- Queue-based processing
- OpenAPI / Swagger documentation
- Docker containerization
- CI/CD pipelines
- Database observability
- Distributed tracing
- Metrics collection
- Structured audit logs
- Refresh-token rotation
- Token revocation
- API request correlation IDs

---

# Project Goals

This repository is not intended to be a minimal Express CRUD tutorial.

Its primary goals are to demonstrate:

1. Clean backend architecture
2. Strong type safety
3. Secure authentication
4. Domain-driven modular organization
5. Production-oriented API design
6. Testable business logic
7. Maintainable engineering practices
8. Scalable project structure

---

# Why This Project Stands Out

### Architecture

Feature-based modular architecture keeps the codebase maintainable as features increase.

### Security

Authentication, authorization, validation, and secure middleware are first-class concerns.

### Type Safety

TypeScript and Prisma reduce an entire class of runtime and database-related mistakes.

### Maintainability

Business logic lives in services rather than becoming tightly coupled to Express routes.

### Testability

Controllers, services, and HTTP endpoints can be tested independently.

### Scalability

New business domains can be added without creating a monolithic codebase.

---

# Repository Philosophy

> **Build software that is easy to understand today and easy to change tomorrow.**

The goal of this repository is to demonstrate backend engineering decisions that scale beyond a small demo application.

---

# Contributing

Contributions are welcome.

Before submitting a pull request:

```bash
npm run lint
npm run build
npm test
```

Please keep pull requests:

- Focused
- Small
- Well documented
- Tested
- Consistent with the existing architecture

---

# License

This project is licensed under the [MIT License](./LICENSE).

---

# Maintainer

<p align="center">
  <strong>Md Abu Kayser</strong>
  <br />
  Full-Stack Developer
</p>

<p align="center">
  <a href="https://github.com/md-abu-kayser">
    GitHub
  </a>
  •
  <a href="mailto:abu.kayser.official@gmail.com">
    Email
  </a>
</p>

---

<p align="center">
  <sub>Built with TypeScript, Express, Prisma, and PostgreSQL.</sub>
</p>
