import sequelize from "../../../config/database.js";
import { DataTypes } from "sequelize";

export const UsuarioModel = sequelize.define(
    'UsuarioModel',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nome: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O nome não pode estar vazio"
                },
                isAlpha: {
                    msg: "O nome deve conter apenas letras"
                },
                len: {
                    args: [1, 150],
                    msg: "O nome deve ter entre 1 e 150 caracteres"
                },
            },
        },
        matricula: {
            type: DataTypes.CHAR(5),
            unique: {
                msg: "Esta matrícula já está registrada"
            },
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "A matrícula não pode estar vazia"
                },
                isAlphanumeric: {
                    msg: "A matrícula deve conter apenas letras e números"
                },
                len: {
                    args: [5, 5],
                    msg: "A matrícula deve ter exatamente 5 caracteres"
                },
                is: {
                    args: /^[a-zA-Z]\d{4}$/,
                    msg: "A matrícula deve começar com uma letra seguida de 4 números"
                }
            },
        },
        telefone: {
            type: DataTypes.CHAR(11),
            allowNull: true,
            validate: {
                isNumeric: {
                    msg: "O telefone deve conter apenas números"
                },
                len: {
                    args: [11, 11],
                    msg: "O telefone deve ter exatamente 11 dígitos"
                },
            },
        },
        senha: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "A senha não pode estar vazia"
                },
                len: {
                    args: [8, 8],
                    msg: "A senha deve ter exatamente 8 caracteres"
                },
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/,
                    msg: "A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial, totalizando 8 caracteres."
                }
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "O email não pode estar vazio"
                },
                isEmail: {
                    msg: "Formato de email inválido"
                },
            },
        },
        perfil: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: true,
            validate: {
                isIn: {
                    args: [['admin', 'cliente']],
                    msg: "O perfil deve ser 'admin' ou 'cliente'"
                },
            },
        },
    },
    {
        tableName: "usuario",
        // timestamps 
        createdAt: "criado_em",
        updatedAt: "atualizado_em",
        deletedAt: "excluido_em",
        paranoid: true,
    }
);
