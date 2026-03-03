# Frontend mínimo - Gestão de Restaurante

Interface mínima em HTML/JS com Vite para consumir o backend `2025.11.177-UC9-gestao_restaurante`.

## Requisitos

- Node.js 18+
- Backend rodando (por padrão em `http://localhost:3000`)

## Executar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Configuração

1. Copie `.env.example` para `.env`
2. Ajuste se necessário:
   - `VITE_API_BASE=/api`
   - `VITE_BACKEND_TARGET=http://localhost:3000`

## Funcionalidades mínimas

- Login (`POST /usuarios/login`)
- Sessão por cookie HttpOnly definido pelo backend
- Consulta perfil (`GET /usuarios/perfil`)
- Listagem de usuários (`GET /usuarios` - admin)
- Listagem de mesas (`GET /mesas`)
- Listagem de cardápio (`GET /cardapio`)
- Logout (`POST /usuarios/logout`)
