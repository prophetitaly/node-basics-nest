# Quick Start Guide - NestJS Migration

## What Changed

This project has been converted from Express to NestJS. Here are the key changes:

### Project Structure

**Before (Express):**

```
src/
└── index.ts
```

**After (NestJS):**

```
src/
├── main.ts                    # Application entry point
├── app.module.ts              # Root module
├── health/
│   └── health.controller.ts   # Health check
└── users/
    ├── users.module.ts        # Users module
    ├── users.controller.ts    # HTTP routes handler
    ├── users.service.ts       # Business logic
    ├── dto/
    │   └── create-user.dto.ts # Request validation
    └── entities/
        └── user.entity.ts     # Data models
```

### Key Differences

1. **Architecture**: NestJS uses a modular architecture with decorators
2. **Validation**: Uses `class-validator` with decorators instead of Zod
3. **Dependency Injection**: Services are injected via constructors
4. **Error Handling**: Built-in exceptions (NotFoundException, ConflictException, etc.)
5. **Module System**: CommonJS instead of ES Modules

### Commands

```bash
# Development (watch mode)
npm run dev
# or
npm run start:dev

# Production build
npm run build
npm start

# Run tests
npm test
```

### Example: Creating a User

**Request:**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-12-04T10:00:00.000Z"
}
```

### Testing

Tests have been updated to use NestJS Testing utilities:

- Uses `@nestjs/testing` to create a test module
- Uses `app.getHttpServer()` instead of direct `app` instance
- Error responses use `message` instead of `error` property

### Next Steps

1. Run `npm run dev` to start the development server
2. Test the health endpoint: `curl http://localhost:3000/health`
3. Implement the remaining features (active users, worker threads, etc.)
4. Run tests with `npm test`

## NestJS Concepts

### Decorators

- `@Controller()` - Defines a route handler class
- `@Get()`, `@Post()`, `@Delete()` - HTTP method decorators
- `@Body()` - Extract request body
- `@Param()` - Extract route parameters
- `@Query()` - Extract query parameters

### Modules

Modules organize the application into cohesive blocks. Each feature should have its own module.

### Services

Services contain business logic and can be injected into controllers or other services.

### DTOs (Data Transfer Objects)

DTOs define the shape of data and validation rules using class-validator decorators.

### Exception Filters

NestJS automatically handles exceptions and converts them to proper HTTP responses.
