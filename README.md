# Sistema de Gestão de Restaurante

API REST em Node.js com Express e Sequelize, organizada em módulos (MVC) para **usuários**, **cardápio** e **mesas**.

## Sumário

- [Visão geral](#visão-geral)
- [Requisitos](#requisitos)
- [Configuração](#configuração)
- [Como executar](#como-executar)
- [Regras de acesso (autenticação e perfis)](#regras-de-acesso-autenticação-e-perfis)
- [Regras de negócio e validações](#regras-de-negócio-e-validações)
- [Rotas](#rotas)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Observações importantes](#observações-importantes)

## Visão geral

- **Tecnologias**: Node.js, Express, Sequelize, PostgreSQL, JWT, bcrypt.
- **Arquitetura**: MVC por módulos.
- **Autenticação**: JWT via header Authorization.

## Requisitos

- Node.js 18+ (recomendado)
- PostgreSQL

## Configuração

1. Crie o arquivo .env a partir do exemplo:

   - Copie .env.example para .env

2. Ajuste as variáveis conforme seu ambiente (banco, porta e dados do super admin).

## Como executar

```bash
npm i
npm start
```

A API sobe em http://localhost:PORT, conforme definido no .env.

## Regras de acesso (autenticação e perfis)

### Autenticação (JWT)
- Envie o token no header:
  - Authorization: Bearer <token>
- O token é gerado no login e contém: id, email e perfil.

### Perfis
- admin
  - Pode gerenciar usuários, cardápio e mesas.
- cliente
  - Pode listar cardápio e mesas.

### Controle por rota
- /usuarios
  - login: público
  - listar/criar/editar/excluir: apenas admin
  - perfil: autenticado
- /cardapio
  - listar: cliente
  - criar/editar/excluir: admin
- /mesas
  - listar: cliente
  - criar/editar/excluir: admin

## Regras de negócio e validações

### Usuário
- nome: obrigatório, 1–150 caracteres
- matricula: obrigatório, exatamente 5 caracteres, único
- telefone: opcional, 11 dígitos numéricos
- senha: obrigatória
- email: obrigatório e formato válido
- perfil: admin ou cliente

### Cardápio
- nome: obrigatório, 1–100 caracteres
- descricao: opcional, até 250 caracteres
- porcao: obrigatória, 1–2 caracteres
- preco: obrigatório, numérico e não negativo
- usuario_id: obrigatório, UUID válido (referência em usuário)

### Mesa
- numero: obrigatório, inteiro >= 1
- capacidade: obrigatório, inteiro >= 1 (máximo 10)
- usuario_id: obrigatório, UUID válido (referência em usuário)

## Rotas

### Saúde
- GET /
  - Retorna { status: "ok" }

### Usuários
- POST /usuarios/login
- GET /usuarios/perfil
- GET /usuarios
- POST /usuarios
- PUT /usuarios/:id
- DELETE /usuarios/:id

### Cardápio
- GET /cardapio
- POST /cardapio
- PUT /cardapio/:id
- DELETE /cardapio/:id

### Mesas
- GET /mesas
- POST /mesas
- PUT /mesas/:id
- DELETE /mesas/:id

## Estrutura de pastas

```
src/
├── config/
│   └── database.js
├── middleware/
│   ├── authMiddleware.js
│   └── autorizationMiddleware.js
└── modules/
    ├── usuarios/
    ├── cardapio/
    └── mesas/
```

## Observações importantes

- A aplicação executa sequelize.sync({ force: true, alter: true }).
  - Isso recria tabelas e pode apagar dados a cada execução.
- Um super admin é criado automaticamente na primeira inicialização usando os dados do .env.
