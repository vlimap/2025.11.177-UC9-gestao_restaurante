
# Arquitetura - Sistema de Gestão de Restaurante

## Visão Geral
API construída em **Node.js com Express** e **Sequelize** (ORM), seguindo padrão **MVC modularizado**.

## Estrutura de Diretórios

```
src/
├── modules/
│   ├── usuarios/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── cardapio/
│   ├── mesas/
│   └── [outros módulos]/
├── config/
│   └── database.js
├── middleware/
└── app.js
```

## Padrão MVC por Módulos

### Model
- Definição das entidades com **Sequelize**
- Relacionamentos entre tabelas
- Validações de dados

### Controller
- Lógica de requisição/resposta HTTP
- Comunicação com services
- Tratamento de erros

### Route
- Definição de endpoints
- Middlewares específicos
- Autenticação/autorização

### Service
- Lógica de negócio
- Operações com banco de dados
- Reutilização entre controllers

## Tecnologias

| Tecnologia | Função |
|-----------|---------|
| Express | Framework web |
| Sequelize | ORM para banco de dados |
| Node.js | Runtime JavaScript |

## Fluxo de Requisição

```
Requisição HTTP → Route → Controller → Service → Model → Banco de Dados
```
