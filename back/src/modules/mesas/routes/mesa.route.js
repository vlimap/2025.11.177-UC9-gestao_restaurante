import express from "express";
import { MesaController } from "../controllers/mesa.controller.js";
import { autenticarToken } from "../../../middleware/authMiddleware.js";
import { autorization } from "../../../middleware/autorizationMiddleware.js";

const router = express.Router();

// Rotas protegidas
router.get("/", autenticarToken, autorization.cliente, MesaController.listar);
router.post("/", autenticarToken, autorization.admin, MesaController.criar);
router.put("/:id", autenticarToken, autorization.admin, MesaController.editar);
router.delete("/:id", autenticarToken, autorization.admin, MesaController.excluir);

export default router;
