import { UsuarioModel } from "../models/usuario.model.js";
import dotenv from "dotenv/config"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

function obterConfiguracaoCookie() {
    const nomeCookie = process.env.AUTH_COOKIE_NAME || "auth_token";
    const maxAgePadrao = 24 * 60 * 60 * 1000;
    const maxAge = Number(process.env.AUTH_COOKIE_MAX_AGE_MS) || maxAgePadrao;
    const secure = process.env.NODE_ENV === "production";

    return {
        nomeCookie,
        options: {
            httpOnly: true,
            secure: secure,
            sameSite: "lax",
            path: "/",
            maxAge: maxAge
        }
    };
}

export class UsuarioController {
    static async listar(req, res) {
        try {
            const usuario = await UsuarioModel.findAll(
                {
                    attributes: {
                        exclude: ["senha"]
                    }
                }
            )
            if (!usuario) {
                return res.status(406).json({ msg: "Nenhum usuario encontrado" })
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }
    static async perfil(req, res) {
        try {
            return res.json({
                mensagem: "Acesso autorizado!",
                usuario: req.usuario
            });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }
    static async criar(req, res) {
        try {
            const { nome, matricula, email, senha, perfil, telefone } = req.body
            await UsuarioModel.create(
                {
                    nome: nome,
                    matricula: matricula,
                    email: email,
                    senha: senha,
                    perfil: perfil,
                    telefone: telefone
                }
            )
            if (!nome || !matricula || !email || !senha || !perfil || !telefone) {
                return res.status(406).json({ msg: 'Preencha todos os campos!' })
            }
            res.status(201).json({ msg: 'Usuario criado com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async editar(req, res) {
        try {
            const { nome, matricula, email, senha, perfil, telefone } = req.body
            const id = req.params.id
            await UsuarioModel.update(
                {
                    nome: nome,
                    matricula: matricula,
                    email: email,
                    senha: senha,
                    perfil: perfil,
                    telefone: telefone
                },
                {
                    where: {
                        id: id
                    }
                }
            )
            res.status(200).json({ msg: 'Usuario atualizado com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await UsuarioModel.destroy(
                {
                    where: {
                        id: id
                    }
                }
            )
            res.status(200).json({ msg: "Usuário deletado com sucesso." })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ erro: "email e senha são obrigatórios" });
            }
            const usuario = await UsuarioModel.findOne(
                {
                    where: {
                        email: email
                    }
                }
            )
            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            }
            // Compara senha digitada com o hash salvo no banco
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "E-mail ou senha incorreta" });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    perfil: usuario.perfil
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );

            const { nomeCookie, options } = obterConfiguracaoCookie();
            res.cookie(nomeCookie, token, options);

            return res.json({ mensagem: "Login bem-sucedido!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async logout(req, res) {
        try {
            const { nomeCookie, options } = obterConfiguracaoCookie();
            res.clearCookie(nomeCookie, {
                httpOnly: options.httpOnly,
                secure: options.secure,
                sameSite: options.sameSite,
                path: options.path
            });

            return res.status(200).json({ mensagem: "Logout realizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno, tente novamente mais tarde.", erro: error.message })
        }
    }

    static async criarAdmin(req, res) {
        try {
            const senhaHash = await bcrypt.hash(process.env.SENHA_SUPER_ADMIN, 10)
            await UsuarioModel.create(
                {
                    nome: process.env.NOME_SUPER_ADMIN,
                    matricula: process.env.MATRICULA_SUPER_ADMIN,
                    email: process.env.EMAIL_SUPER_ADMIN,
                    senha: senhaHash,
                    perfil: "admin",
                    telefone: process.env.TELEFONE_SUPER_ADMIN
                }
            )
            res.status(201).json({ msg: 'Usuário SUPER ADMIN criado com sucesso!' })
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar admin, tente novamente mais tarde.", erro: error.message })
        }
    }

}