# ITX Frontend Test

Mini tienda (PLP + PDP) construida con **React + TypeScript + Vite**. 

---

## ▶️ Scripts

```bash
npm install

npm run start     # dev
npm run test      # vitest
npm run lint      # eslint
npm run format    # prettier --write .
npm run build     # tsc -b + vite build
```

---

## 🧱 Arquitectura

```
src/
 ├─ app/                 # router + layout
 ├─ components/          # componentes reutilizables
 ├─ domain/              # tipos/entidades de dominio (Product)
 ├─ pages/               # pantallas (PLP / PDP)
 ├─ services/            # API client + cache TTL
 │   ├─ api/             # endpoints + apiClient
 │   └─ cache/           # cache layer
 ├─ store/               # cartStore + persistencia + hook
 ├─ utils/               # helpers
 └─ index.css            # tokens CSS (container sizes)
```

---

## 🧪 Tests

Cobertura sobre:
- Caché TTL (`services/cache`)
- Persistencia + store del carrito (`store/`)
- Búsqueda PLP (`pages/ProductListPage/search`)
- Flujo PDP → Add → Header actualizado (test con router en memoria)