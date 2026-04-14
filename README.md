# Secure Device API (NestJS Backend Demo)

## Overview

This project is a **security-focused backend API** built with NestJS.
It demonstrates how to implement authentication, route protection, and input validation using real-world backend patterns.

The goal of this project is to showcase **clean architecture, security awareness, and production-ready practices**.

---

## Key Features

### Authentication

* JWT-based authentication
* Secure login endpoint (`POST /auth/login`)
* Password verification using bcrypt

### Authorization

* Protected routes using Passport JWT strategy
* Guard-based access control (`@UseGuards`)

### Input Validation

* DTO-based validation using `class-validator`
* Global `ValidationPipe` with:

  * `whitelist: true`
  * `forbidNonWhitelisted: true`

### Error Handling

* Proper HTTP responses:

  * `401 Unauthorized` for invalid credentials or missing token
  * `400 Bad Request` for invalid input
* Clean separation between:

  * Request-time errors (NestJS exceptions)
  * Configuration errors (startup validation)

### Environment Configuration

* Secrets managed via environment variables
* Required variables documented in `.env.example`

---

## API Endpoints

### Authentication

#### `POST /auth/login`

Authenticate and receive a JWT token.

**Request Body**

```json
{
  "email": "admin@example.com",
  "password": "your_password"
}
```

**Response**

```json
{
  "access_token": "JWT_TOKEN"
}
```

---

### Devices (Protected)

#### `GET /devices`

Returns all devices (requires JWT)

#### `POST /devices`

Creates a new device (requires JWT + validated input)

**Example Request**

```json
{
  "name": "PLC A",
  "ipAddress": "192.168.1.10",
  "location": "Plant A",
  "status": "online"
}
```

---

## Security Considerations

* JWT secret stored securely in environment variables
* Passwords are **never stored in plain text**
* Input validation prevents:

  * Unexpected fields
  * Invalid formats (e.g., IP address)
* Protected routes require valid JWT tokens
* Minimal attack surface with strict DTO validation

---

## Project Structure

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── strategies/jwt.strategy.ts
├── devices/
│   ├── devices.controller.ts
│   ├── devices.service.ts
│   └── dto/create-device.dto.ts
├── common/
│   └── guards/jwt-auth.guard.ts
└── main.ts
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env
```

Fill in:

```
JWT_SECRET=your_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

### 3. Run the server

```bash
npm run start
```

---

## Testing the API

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@example.com","password":"your_password"}'
```

### Use Token

```bash
curl -X GET http://localhost:3000/devices \
-H "Authorization: Bearer YOUR_TOKEN"
```

---

## Purpose of This Project

This project was built to demonstrate:

* Secure backend development practices
* Authentication and authorization design
* Input validation and API hardening
* Clean and maintainable NestJS architecture

---

## Author

Built as part of a focused effort to develop **production-ready backend and security skills**.

