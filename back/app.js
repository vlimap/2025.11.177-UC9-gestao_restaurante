import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import usuarioRoutes from "./src/modules/usuarios/routes/usuario.route.js";
import cardapioRoutes from "./src/modules/cardapio/routes/cardapio.route.js";
import mesaRoutes from "./src/modules/mesas/routes/mesa.route.js";
import { UsuarioController } from "./src/modules/usuarios/controllers/usuario.controller.js"
// Carrega variáveis do arquivo .env para process.env
// Ex.: PORT, DATABASE_URL, JWT_SECRET, etc.
dotenv.config();

// Cria a aplicação Express (nosso servidor HTTP)
const app = express();

// Middleware para o Express entender JSON no corpo da requisição.
// Sem isso, req.body vem undefined em POST/PUT/PATCH com JSON.
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok" }));
app.post("/", UsuarioController.criarAdmin)
// Registra as rotas
app.use("/usuarios", usuarioRoutes);
app.use("/cardapio", cardapioRoutes);
app.use("/mesas", mesaRoutes);

// Inicia o servidor. A porta vem do .env (process.env.PORT).
app.listen(process.env.PORT, async () => {
  await sequelize.sync({force: true, alter: true})
  
  // Cria super admin na primeira execução
  try {
    const { UsuarioModel } = await import("./src/modules/usuarios/models/usuario.model.js");
    const adminExistente = await UsuarioModel.findOne({
      where: { email: process.env.EMAIL_SUPER_ADMIN }
    });
    
    if (!adminExistente) {
      console.log("Criando super admin...");
      const response = await fetch(`http://localhost:${process.env.PORT}/`, {
        method: "POST"
      });
      const result = await response.json();
      console.log(result.msg);
    }
  } catch (error) {
    console.log("Super admin já existe ou erro ao criar:", error.message);
  }
  
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});