import express from "express";
import { CardapioController } from "../controllers/cardapio.controller.js";
import { autenticarToken } from "../../../middleware/authMiddleware.js";
import { autorization } from "../../../middleware/autorizationMiddleware.js";

const router = express.Router();

// Rotas protegidas
router.get("/", autenticarToken, autorization.cliente, CardapioController.listar);
router.post("/", autenticarToken, autorization.admin, CardapioController.criar);
router.put("/:id", autenticarToken, autorization.admin, CardapioController.editar);
router.delete("/:id", autenticarToken, autorization.admin, CardapioController.excluir);

export default router;
