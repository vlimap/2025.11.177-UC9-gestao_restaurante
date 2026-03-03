import express from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { autenticarToken } from "../../../middleware/authMiddleware.js";
import { autorization } from "../../../middleware/autorizationMiddleware.js";

const router = express.Router();

// Rota pública - login
router.post("/login", UsuarioController.login);
router.post("/logout", UsuarioController.logout);

// Rotas protegidas
router.get("/perfil", autenticarToken, UsuarioController.perfil);
router.get("/", autenticarToken, autorization.admin, UsuarioController.listar);
router.post("/", autenticarToken, autorization.admin, UsuarioController.criar);
router.put("/:id", autenticarToken, autorization.admin, UsuarioController.editar);
router.delete("/:id", autenticarToken, autorization.admin, UsuarioController.excluir);

export default router;
