import { CardapioModel } from "../models/cardapio.model.js";

export class CardapioController {
	static async listar(req, res) {
		try {
			const cardapio = await CardapioModel.findAll();
			if (!cardapio) {
				return res.status(406).json({ msg: "Nenhum item de cardápio encontrado" });
			}
			res.status(200).json(cardapio);
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async criar(req, res) {
		try {
			const { nome, descricao, porcao, preco, usuario_id } = req.body;
			await CardapioModel.create(
				{
					nome: nome,
					descricao: descricao,
					porcao: porcao,
					preco: preco,
					usuario_id: usuario_id
				}
			);
			if (!nome || !porcao || !preco || !usuario_id) {
				return res.status(406).json({ msg: "Preencha todos os campos obrigatórios!" });
			}
			res.status(201).json({ msg: "Item do cardápio criado com sucesso!" });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async editar(req, res) {
		try {
			const { nome, descricao, porcao, preco, usuario_id } = req.body;
			const id = req.params.id;
			await CardapioModel.update(
				{
					nome: nome,
					descricao: descricao,
					porcao: porcao,
					preco: preco,
					usuario_id: usuario_id
				},
				{
					where: {
						id: id
					}
				}
			);
			res.status(200).json({ msg: "Item do cardápio atualizado com sucesso!" });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}

	static async excluir(req, res) {
		try {
			const { id } = req.params;
			await CardapioModel.destroy(
				{
					where: {
						id: id
					}
				}
			);
			res.status(200).json({ msg: "Item do cardápio deletado com sucesso." });
		} catch (error) {
			res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message });
		}
	}
}
