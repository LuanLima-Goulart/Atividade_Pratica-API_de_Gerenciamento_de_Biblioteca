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
                nomeCompleto: u.nome_completo,
                cpf: cpf,
                data_nascimento: u.data_nascimento,
                dataAniversario: u.data_nascimento,
                email: u.email,
                telefone: u.telefone
            };
        });
        return res.json(listaFormatada);
    } catch(error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao buscar usuários" });
    }
}

const pesquisarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if(!usuario){
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        const cpf = extrairCpfDescriptografado(usuario);

        return res.json({
            id: usuario.id,
            cpf: cpf,
            nome_completo: usuario.nome_completo,
            nomeCompleto: usuario.nome_completo,
            data_nascimento: usuario.data_nascimento,
            dataAniversario: usuario.data_nascimento,
            email: usuario.email,
            telefone: usuario.telefone
        });
    } catch(error) {
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
            cpfIv: cpfIV, 
            cpfTag: cpfTag, 
            nomeCompleto: nome, 
            dataAniversario: dataNasc, 
            email, 
            telefone: telefoneNumerico, 
            senhaHash: hash, 
            senhaSalt: salt
        });

        return res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            usuario: novoUsuario
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao criar usuário" });
    }
}

async function atualizarUsuario(req, res) {
    try {
        const id = req.params.id;
        const usuarioExistente = await usuariosModel.buscarPorId(id);

        if (!usuarioExistente) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        const { 
            nome_completo, 
            nomeCompleto, 
            data_nascimento, 
            dataAniversario, 
            email, 
            telefone, 
            cpf, 
            senha 
        } = req.body;

        const nome = nome_completo || nomeCompleto || usuarioExistente.nome_completo;
        const dataNasc = data_nascimento || dataAniversario || usuarioExistente.data_nascimento;
        const emailFinal = email || usuarioExistente.email;
        const telFinal = telefone ? (typeof telefone === "string" ? telefone.replace(/\D/g, "") : telefone) : usuarioExistente.telefone;

        let dadosAtualizacao = {
            nome_completo: nome,
            data_nascimento: dataNasc,
            email: emailFinal,
            telefone: telFinal
        };

        if (cpf) {
            const { iv, tag, valorCriptografado } = criptografar(cpf);
            dadosAtualizacao.cpf = valorCriptografado;
            dadosAtualizacao.cpf_iv = iv;
            dadosAtualizacao.cpf_tag = tag;
        }

        if (senha) {
            const { salt, hash } = await gerarHashSenha(senha);
            dadosAtualizacao.senha_hash = hash;
            dadosAtualizacao.senha_salt = salt;
        }

        const usuarioAtualizado = await usuariosModel.editar(id, dadosAtualizacao);

        return res.json({
            mensagem: "Usuário atualizado com sucesso!",
            usuario: usuarioAtualizado
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

        if(!usuario){
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        await usuariosModel.excluir(id);

        return res.json({
            mensagem: "Usuário deletado!"
        });
    } catch(error) {
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