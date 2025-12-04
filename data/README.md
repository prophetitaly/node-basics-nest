# Database Simulato

Questa cartella contiene dati JSON che simulano un database per l'esercizio.

## 📁 File disponibili

### `users.json`

Contiene 12 utenti di esempio con struttura completa:

- `id`: UUID valido
- `name`: Nome completo
- `email`: Email valida
- `createdAt`: Data ISO 8601

## 💡 Utilizzo

Puoi usare questi dati in diversi modi:

1. **In-memory storage**: Carica i dati all'avvio e gestiscili in memoria

```typescript
import fs from "fs";
const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
```

2. **File-based persistence**: Leggi e scrivi il file ad ogni operazione CRUD

3. **Database iniziale**: Usa come seed per un database reale (opzionale)

## 🎯 Obiettivo

L'obiettivo è implementare le operazioni CRUD usando questi dati come punto di partenza, mantenendo la persistenza durante l'esecuzione del server (in-memory è sufficiente per l'esercizio).
