import sequelize from "../../../config/database.js";
import { DataTypes } from "sequelize";

export const CardapioModel = sequelize.define(
    'CardapioModel',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O nome do prato não pode estar vazio"
                },
                len: {
                    args: [1, 100],
                    msg: "O nome deve ter entre 1 e 100 caracteres"
                },
            },
        },
        descricao: {
            type: DataTypes.STRING(250),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 250],
                    msg: "A descrição deve ter no máximo 250 caracteres"
                },
            },
        },
        porcao: {
            type: DataTypes.CHAR,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "A porção não pode estar vazia"
                },
                len: {
                    args: [1, 2],
                    msg: "A porção deve conter 1 caractere no minimo é no máximo 2"
                },
            },
        },
        preco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: {
                    msg: "O preço deve ser um valor numérico válido"
                },
                min: {
                    args: [0],
                    msg: "O preço não pode ser negativo"
                },
            },
        },
        usuario_id: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                isUUID: {
                    msg: "O ID do usuário deve ser um UUID válido"
                },
            },
            references: {
                model: "usuario",
                key: "id"
            }
        },
    },
    {
        tableName: "cardapio",
        createdAt: "criado_em",
        updatedAt: "atualizado_em",
        deletedAt: "excluido_em",
        paranoid: true,
    }
);
