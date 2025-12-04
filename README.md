# ESERCIZIO PRATICO Node.js COMPLETO

**Obiettivo:** Creare API REST minimale con validazione, errori e logging  
**Stack:** Express + UUID + Validazione (Zod/Joi/Manuale)

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
```

**File di partenza:** `index.ts`

```typescript
import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

// === IL TUO CODICE QUI ===

app.listen(PORT, () => {
  console.log(`🚀 Server on http://localhost:${PORT}`);
});
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

- `express` ^4.21.2 - Framework web
- `zod` ^3.23.8 - Validazione schema (opzionale)
- `joi` ^17.13.3 - Validazione schema alternativa (opzionale)
- `uuid` ^11.0.3 - Generazione UUID

### Development

- `typescript` ^5.7.2 - TypeScript compiler
- `tsx` ^4.19.2 - TypeScript executor (più veloce di ts-node)
- `jest` ^29.7.0 - Framework testing
- `supertest` ^7.0.0 - Testing HTTP

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

1. **Validazione:** Puoi scegliere tra tre approcci:
   - **Zod:** Validazione type-safe con TypeScript
   - **Joi:** Validazione con API fluente e messaggi dettagliati
   - **Manuale:** Validazione con if/else e regex (più controllo, più verbosa)
2. **UUID:** Usa `uuid.v4()` per generare ID unici
3. **Paginazione:** Calcola offset = (page - 1) \* limit
4. **Database Simulato:** Usa i dati in `data/users.json` come storage iniziale
   - Puoi leggerli e modificarli in memoria
   - Oppure implementare persistenza su file
5. **Filtraggio Utenti Attivi:**
   - Filtra solo utenti di tipo `NewUser` con `isActive === true`
   - Usa type guard per verificare la presenza della proprietà `isActive`
6. **Worker Threads:** Usa `worker_threads` per task pesanti
   - Crea un file worker separato (es. `heavy-task.worker.ts`)
   - Usa `new Worker()` per lanciare il worker
   - Comunica con `postMessage` e `on('message')`
   - Memorizza lo stato dei task in una Map/oggetto
7. **Docker:** Crea un Dockerfile per containerizzare l'applicazione
   - Usa immagine base Node.js (es. `node:22-alpine`)
8. **Status Code:**
   - 200 OK (GET successo)
   - 201 Created (POST successo)
   - 202 Accepted (Task avviato)
   - 204 No Content (DELETE successo)
   - 400 Bad Request (validazione fallita)
   - 404 Not Found (risorsa non trovata)
   - 409 Conflict (email duplicata)

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

- **TypeScript:** Configurato con ES Modules (`type: "module"`)
- **Target:** ESNext con moduleResolution bundler
- **Executor:** `tsx` per sviluppo veloce
- **Testing:** Jest con ts-jest per supporto ESM

---

**Buon lavoro! 🚀**
