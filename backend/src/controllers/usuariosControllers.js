const usuariosModel = require("../models/usuariosModels");
const { gerarHashSenha } = require("../utils/crypto/hash");
const { criptografar, descriptografar } = require("../utils/crypto/criptografia");

function extrairCpfDescriptografado(usuario) {
    if (!usuario.cpf || !usuario.cpf_iv || !usuario.cpf_tag) {
        return null;
    }
    try {
        return descriptografar({
            ivArmazenado: usuario.cpf_iv,
            tagArmazenada: usuario.cpf_tag,
            valorArmazenado: usuario.cpf
        });
    } catch (err) {
        console.error("Erro ao descriptografar CPF:", err);
        return null;
    }
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuariosModel.buscarTodos();
        const listaFormatada = usuarios.map(u => {
            const cpf = extrairCpfDescriptografado(u);
            return {
                id: u.id,
                nome_completo: u.nome_completo,
                cpf: cpf,
                data_nascimento: u.data_nascimento,
                email: u.email,
                telefone: u.telefone
            };
        });
        return res.json(listaFormatada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao buscar usuários" });
    }
}

const pesquisarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        const cpf = extrairCpfDescriptografado(usuario);

        return res.json({
            id: usuario.id,
            nome_completo: usuario.nome_completo,
            cpf: cpf,
            data_nascimento: usuario.data_nascimento,
            email: usuario.email,
            telefone: usuario.telefone
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao buscar usuário" });
    }
};

async function criarUsuario(req, res) {
    try {
        const {
            cpf,
            nome_completo,
            nomeCompleto,
            data_nascimento,
            dataAniversario,
            email,
            telefone,
            senha
        } = req.body;

        const nome = nome_completo || nomeCompleto;
        const dataNasc = data_nascimento || dataAniversario;

        const telefoneNumerico = typeof telefone === "string" ? telefone.replace(/\D/g, "") : telefone;

        const senhaEfetiva = senha || "123456";
        const { salt, hash } = await gerarHashSenha(senhaEfetiva);

        const { iv: cpfIV, tag: cpfTag, valorCriptografado: cpfCriptografado } = criptografar(cpf);

        const novoUsuario = await usuariosModel.criar({
            cpf: cpfCriptografado,
            cpf_iv: cpfIV,
            cpfIv: cpfIV,
            cpf_tag: cpfTag,
            cpfTag: cpfTag,
            nome_completo: nome,
            nomeCompleto: nome,
            data_nascimento: dataNasc,
            dataAniversario: dataNasc,
            email,
            telefone: telefoneNumerico,
            senha_hash: hash,
            senhaHash: hash,
            senha_salt: salt,
            senhaSalt: salt
        });

        return res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario: novoUsuario
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao criar usuário" });
    }
}

async function atualizarUsuario(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado!"
            });
        }

        const { 
            cpf, 
            nome_completo, 
            nomeCompleto, 
            data_nascimento, 
            dataNascimento, 
            dataAniversario, 
            email, 
            telefone, 
            senha 
        } = req.body;

        const dadosAtualizados = {};

        const nome = nome_completo !== undefined ? nome_completo : nomeCompleto;
        if (nome !== undefined) {
            dadosAtualizados.nome_completo = nome;
        }

        const dataNasc = data_nascimento !== undefined 
            ? data_nascimento 
            : (dataNascimento !== undefined ? dataNascimento : dataAniversario);
        if (dataNasc !== undefined) {
            dadosAtualizados.data_nascimento = dataNasc;
        }

        if (email !== undefined) {
            dadosAtualizados.email = email;
        }

        if (telefone !== undefined) {
            dadosAtualizados.telefone = typeof telefone === "string" ? telefone.replace(/\D/g, "") : telefone;
        }

        if (cpf !== undefined) {
            const { iv: cpf_iv, tag: cpf_tag, valorCriptografado: cpfCriptografado } = criptografar(cpf);
            dadosAtualizados.cpf = cpfCriptografado;
            dadosAtualizados.cpf_iv = cpf_iv;
            dadosAtualizados.cpf_tag = cpf_tag;
        }

        if (senha !== undefined) {
            const { salt: senha_salt, hash: senha_hash } = await gerarHashSenha(senha);
            dadosAtualizados.senha_salt = senha_salt;
            dadosAtualizados.senha_hash = senha_hash;
        }

        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({
                mensagem: "Nenhum campo fornecido para atualização."
            });
        }

        await usuariosModel.atualizar(id, dadosAtualizados);

        return res.json({
            mensagem: "Usuário editado com sucesso!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
    }
}

async function deletarUsuario(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        await usuariosModel.excluir(id);

        return res.json({
            mensagem: "Usuário deletado!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao excluir usuário" });
    }
}

module.exports = {
    listarUsuarios,
    pesquisarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    buscarTodos: listarUsuarios,
    buscarPorId: pesquisarUsuario,
    criar: criarUsuario,
    editar: atualizarUsuario,
    excluir: deletarUsuario
};