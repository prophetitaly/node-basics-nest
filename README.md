# ESERCIZIO PRATICO Node.js con NestJS

**Obiettivo:** Creare API REST minimale con validazione, errori e logging  
**Stack:** NestJS + UUID + Validazione (class-validator)

---

## 📋 SPECIFICHE TECNICHE

**Endpoint richiesti:**

- `POST /users` → Crea utente (201 Created)
- `GET /users/:id` → Utente singolo
- `GET /users?page=1&limit=10` → Lista utenti paginata
- `GET /users/active` → Lista utenti attivi (solo NewUser con isActive=true)
- `DELETE /users/:id` → Elimina utente (204 No Content)
- `POST /tasks/heavy` → Lancia task pesante su worker thread (202 Accepted)
- `GET /tasks/:taskId` → Stato e risultato del task

**Schema Utente:**

```typescript
interface LegacyUser {
  id: string; // UUID
  name: string; // min 2 char
  email: string; // valid email
  createdAt: string; // ISO Date
}

interface NewUser extends LegacyUser {
  isActive: boolean; // active status
}

type User = LegacyUser | NewUser;
```

**Schema Task (Worker Thread):**

```typescript
interface HeavyTaskRequest {
  iterations: number; // min 1, max 1000000
}

interface HeavyTaskResponse {
  taskId: string; // UUID
  status: "processing" | "completed" | "error";
  iterations: number;
  result?: number; // Somma dei numeri primi trovati
  duration?: number; // ms
}
```

---

## 🚀 SETUP INIZIALE

```bash
# Installa dipendenze
npm install

# Avvia server in modalità sviluppo
npm run dev

# Oppure con watch mode
npm run start:dev
```

**Struttura del progetto NestJS:**

```
src/
├── main.ts              # Entry point dell'applicazione
├── app.module.ts        # Modulo principale
├── health/
│   └── health.controller.ts  # Health check endpoint
└── users/
    ├── users.module.ts       # Modulo users
    ├── users.controller.ts   # Controller per le routes
    ├── users.service.ts      # Business logic
    ├── dto/
    │   └── create-user.dto.ts  # Data Transfer Object
    └── entities/
        └── user.entity.ts      # User entity/interface
```

---

## 🧪 TEST AUTOMATICO

### Test Jest

```bash
npm test              # esegue tutti i test
npm run test:watch    # modalità watch
```

I test Jest in `__tests__/api.test.ts` sono esempi da completare dopo l'implementazione.

---

## 📦 DIPENDENZE INCLUSE

### Runtime

- `@nestjs/common` ^10.3.0 - Decorators e utilities NestJS
- `@nestjs/core` ^10.3.0 - Core framework NestJS
- `@nestjs/platform-express` ^10.3.0 - HTTP adapter per Express
- `class-validator` ^0.14.1 - Validazione con decorators
- `class-transformer` ^0.5.1 - Trasformazione oggetti
- `uuid` ^13.0.0 - Generazione UUID
- `reflect-metadata` ^0.2.0 - Metadata reflection API
- `rxjs` ^7.8.1 - Reactive Extensions

### Development

- `@nestjs/cli` ^10.3.0 - CLI di NestJS
- `@nestjs/testing` ^10.3.0 - Utilities per testing
- `typescript` ^5.9.3 - TypeScript compiler
- `jest` ^30.2.0 - Framework testing
- `supertest` ^7.1.4 - Testing HTTP
- `ts-jest` ^29.4.6 - Jest transformer per TypeScript

---

## 🏆 COMANDI RAPIDI

```bash
# Sviluppo
npm run dev

# Build
npm run build
npm start

# Test
npm test
npm run test:api
```

---

## 💡 SUGGERIMENTI

1. **Validazione con NestJS:**
   - Usa `class-validator` decorators nei DTO (@IsString, @IsEmail, @MinLength, etc.)
   - ValidationPipe è già configurato globalmente in `main.ts`
   - I messaggi di errore sono automatici e personalizzabili
2. **UUID:** Usa `uuid.v4()` per generare ID unici
3. **Paginazione:** Calcola offset = (page - 1) \* limit
4. **Database Simulato:** Usa i dati in `data/users.json` come storage iniziale
   - I dati vengono caricati all'avvio del servizio
   - Le modifiche sono salvate su file automaticamente
5. **Filtraggio Utenti Attivi:**
   - Filtra solo utenti di tipo `NewUser` con `isActive === true`
   - Usa type guard `isNewUser()` già definito in `user.entity.ts`
6. **Dependency Injection:**
   - NestJS usa DI per gestire i servizi
   - Inietta il service nel controller tramite constructor
   - I moduli registrano providers e controllers
7. **Exception Handling:**
   - Usa built-in exceptions: `NotFoundException`, `ConflictException`, `BadRequestException`
   - NestJS converte automaticamente le exceptions in response HTTP corrette
8. **Worker Threads:** Usa `worker_threads` per task pesanti
   - Crea un file worker separato (es. `heavy-task.worker.ts`)
   - Crea un modulo/service dedicato per gestire i task
   - Usa `new Worker()` per lanciare il worker
   - Comunica con `postMessage` e `on('message')`
   - Memorizza lo stato dei task in una Map/oggetto
9. **Docker:** Crea un Dockerfile per containerizzare l'applicazione
   - Usa immagine base Node.js (es. `node:22-alpine`)
   - Build con `nest build` per produzione
10. **Status Code:**
    - 200 OK (GET successo)
    - 201 Created (POST successo) - usa `@HttpCode(HttpStatus.CREATED)`
    - 202 Accepted (Task avviato)
    - 204 No Content (DELETE successo) - usa `@HttpCode(HttpStatus.NO_CONTENT)`
    - 400 Bad Request (validazione fallita) - automatico con ValidationPipe
    - 404 Not Found (risorsa non trovata) - automatico con NotFoundException
    - 409 Conflict (email duplicata) - automatico con ConflictException

---

## 🐳 DOCKER

Crea un `Dockerfile` per containerizzare il web server

**Requisiti Dockerfile:**

- Usa un'immagine Node.js LTS (es. `node:22-alpine` per ottimizzare dimensioni)
- Installa dipendenze in fase di build
- Compila TypeScript in produzione
- Esponi la porta 3000
- Usa un utente non-root per sicurezza (opzionale ma consigliato)

---

## 🔧 NOTE TECNICHE

- **NestJS:** Framework progressivo basato su TypeScript e decorators
- **TypeScript:** Configurato per NestJS con decorators e metadata
- **Architettura:** Modulare con Controllers, Services, e Dependency Injection
- **Validazione:** Automatica con class-validator e ValidationPipe
- **Testing:** Jest con supporto NestJS Testing utilities
- **Build:** `nest build` compila il progetto in JavaScript

---

**Buon lavoro! 🚀**
