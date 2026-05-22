# Express Backend

A professional, scalable REST API backend built with TypeScript, Express, Prisma, PostgreSQL, and JWT authentication.

This codebase demonstrates a clean modular architecture, role-based authorization, centralized validation, and production-ready server patterns.

## Key Features

- Express server with `helmet`, `cors`, and structured JSON parsing
- PostgreSQL integration using Prisma ORM
- JWT authentication with access token + refresh token support
- Role-based authorization (`ADMIN`, `CUSTOMER`)
- Zod request validation for body, query, and route parameters
- Centralized error handling and request logging
- Modular route organization for Users, Products, and Orders
- Test-ready configuration with Jest and Supertest

## Tech Stack

- Node.js + TypeScript
- Express 5
- Prisma ORM
- PostgreSQL
- JWT for secure authentication
- Zod for runtime validation
- Winston for structured logging
- Jest + Supertest for automated tests

## Architecture Overview

- `src/app.ts` — Express app configuration and middleware pipeline
- `src/server.ts` — Application bootstrap and database connection logic
- `src/modules` — Feature modules with routes, controllers, services, and validation
- `src/middlewares` — Reusable request validation, auth, logging, and error handling
- `src/database/prisma.ts` — Prisma client singleton
- `prisma/schema.prisma` — Database schema and relationships

## Getting Started

### Prerequisites

- Node.js 20+ / npm
- PostgreSQL database
- `DATABASE_URL` configured in environment variables

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file or supply the following variables:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your-very-secure-secret-at-least-32-characters
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Database Setup

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Run in development

```bash
npm run dev
```

### Build and start

```bash
npm run build
npm start
```

## API Reference

### Health Check

- `GET /health`

### Authentication

- `POST /api/v1/users/register` — Register new user
- `POST /api/v1/users/login` — Authenticate user and receive access + refresh tokens
- `POST /api/v1/users/refresh` — Refresh access token using refresh token
- `GET /api/v1/users/profile` — Get authenticated user profile

### Products

- `GET /api/v1/products` — List products with optional pagination
- `GET /api/v1/products/:id` — Get product details
- `POST /api/v1/products` — Create product (`ADMIN` only)
- `PUT /api/v1/products/:id` — Update product (`ADMIN` only)
- `DELETE /api/v1/products/:id` — Remove product (`ADMIN` only)

### Orders

- `POST /api/v1/orders` — Create order for authenticated customer
- `GET /api/v1/orders/my` — Retrieve current user orders
- `GET /api/v1/orders/all` — Retrieve all orders (`ADMIN` only)
- `GET /api/v1/orders/:id` — Retrieve order by ID with authorization

## Testing

Run the test suite with:

```bash
npm test
```

## Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Compile TypeScript and resolve path aliases
- `npm start` — Run compiled production server
- `npm run lint` — Run ESLint across TypeScript files
- `npm run format` — Format source files with Prettier
- `npm run prisma:migrate` — Apply Prisma migrations
- `npm run prisma:generate` — Generate Prisma client
- `npm run prisma:seed` — Seed the database

## Why This Project Stands Out

- Clean modular design for production-grade APIs
- Strong type safety with TypeScript and Prisma
- Defensive validations with Zod to reduce runtime failures
- Secure authentication and RBAC patterns
- Easy to extend with new modules and services

## Contributing

Contributions and enhancements are welcome. Please open issues or pull requests for bug fixes, feature suggestions, or architecture improvements.

### License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

---

### Contact and Maintainer

- **Name:** Md Abu Kayser
- **Project:** _express-backend_
- **Maintainer:** [md-abu-kayser](https://github.com/md-abu-kayser)
- **Email:** [abu.kayser.official@gmail.com](mailto:abu.kayser.official@gmail.com)
- **GitHub:** [github.com/abu.kayser-official](https://github.com/md-abu-kayser)

If you’d like this README tailored for a specific purpose - such as **hiring managers**, **open-source contributors**, or **client deliverables** - feel free to request a custom tone or format.

---
