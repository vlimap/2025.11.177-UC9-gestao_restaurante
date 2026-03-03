# Gestão de Restaurante (Monorepo)

Este repositório está organizado em duas aplicações separadas:

- `back/`: API REST (Node.js + Express + Sequelize + PostgreSQL)
- `front/`: Frontend web (Vite + JavaScript)

## Estrutura

```text
2025.11.177-UC9-gestao_restaurante/
├── back/
└── front/
```

## Requisitos

- Node.js 18+
- PostgreSQL ativo

## Como executar

### 1) Backend

```bash
cd back
npm install
npm start
```

- API padrão: `http://localhost:3000` (conforme `.env`)
- Configure variáveis em `back/.env` (use `back/.env.example` como base)

### 2) Frontend

Em outro terminal:

```bash
cd front
npm install
npm run dev
```

- App padrão: `http://localhost:5173`
- Configure variáveis em `front/.env` (use `front/.env.example`)

## Fluxo de autenticação

- O login é feito no backend (`POST /usuarios/login`)
- O backend grava sessão em cookie HttpOnly
- O frontend consome a API com credenciais incluídas
- Logout em `POST /usuarios/logout`

## Documentação por projeto

- Backend: `back/README.md`
- Frontend: `front/README.md`

## Observação importante

O backend usa `sequelize.sync({ force: true, alter: true })` no start, o que pode recriar tabelas e apagar dados.
