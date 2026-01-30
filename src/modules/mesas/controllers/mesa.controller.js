import { MesaModel } from "../models/mesa.model.js";

export class MesaController {
	static async listar(req, res) {
		try {
			const mesas = await MesaModel.findAll();
			if (!mesas) {
				return res.status(406).json({ msg: "Nenhuma mesa encontrada" });
			}
			res.status(200).json(mesas);
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async criar(req, res) {
		try {
			const { numero, capacidade, usuario_id } = req.body;
			await MesaModel.create(
				{
					numero: numero,
					capacidade: capacidade,
					usuario_id: usuario_id
				}
			);
			if (!numero || !capacidade || !usuario_id) {
				return res.status(406).json({ msg: "Preencha todos os campos obrigatórios!" });
			}
			res.status(201).json({ msg: "Mesa criada com sucesso!" });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async editar(req, res) {
		try {
			const { numero, capacidade, usuario_id } = req.body;
			const id = req.params.id;
			await MesaModel.update(
				{
					numero: numero,
					capacidade: capacidade,
					usuario_id: usuario_id
				},
				{
					where: {
						id: id
					}
				}
			);
			res.status(200).json({ msg: "Mesa atualizada com sucesso!" });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async excluir(req, res) {
		try {
			const { id } = req.params;
			await MesaModel.destroy(
				{
					where: {
						id: id
					}
				}
			);
			res.status(200).json({ msg: "Mesa deletada com sucesso." });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}
}
