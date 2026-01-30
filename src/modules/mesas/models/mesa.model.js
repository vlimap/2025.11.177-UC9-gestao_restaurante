import sequelize from "../../../config/database.js";
import { DataTypes } from "sequelize";

export const MesaModel = sequelize.define(
    'MesaModel',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "O número deve ser um inteiro"
                },
                min: {
                    args: [1],
                    msg: "O número deve ser maior ou igual a 1"
                },
            },
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: "A capacidade deve ser um inteiro"
                },
                min: {
                    args: [1],
                    msg: "A capacidade deve ser maior ou igual a 1"
                },
                max: {
                    args: [10],
                    msg: "A capacidade não pode exceder 100 pessoas"
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
        tableName: "mesa",
        createdAt: "criado_em",
        updatedAt: "atualizado_em",
        deletedAt: "excluido_em",
        paranoid: true,
    }
);
