import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
// Carrega variáveis do arquivo .env para process.env
// Ex.: PORT, DATABASE_URL, JWT_SECRET, etc.
dotenv.config();

// Cria a aplicação Express (nosso servidor HTTP)
const app = express();

// Middleware para o Express entender JSON no corpo da requisição.
// Sem isso, req.body vem undefined em POST/PUT/PATCH com JSON.
app.use(express.json());


app.get("/", (req, res) => res.json({ status: "ok" }));

// Inicia o servidor. A porta vem do .env (process.env.PORT).
app.listen(process.env.PORT, async () => {
  await sequelize.sync({force: true, alter: true})
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});