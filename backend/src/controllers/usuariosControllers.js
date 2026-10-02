const listaUsuarios = require("../models/usuariosModels");

const listarUsuarios = async (req, res) =>{
    const usuarios = await listaUsuarios.buscarTodos();

    res.json(usuarios);
};

const pesquisarUsuario = async (req, res) => {
    const id = req.params.id
    const usuario = await listaUsuarios.buscarId(id);

    if(!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado!"
        });
    }

    res.json(usuario);
};

const criarUsuario = async (req, res) => {
    const {nome_completo, cpf, email, telefone, data_nascimento} = req.body;
    const novoUsuario = await listaUsuarios.criar(nome_completo, cpf, email, telefone, data_nascimento);

    res.status(201).json(novoUsuario);
};

const atualizarUsuario = async (req, res) => {
    const id = req.params.id;
    const {nome_completo, cpf, email, telefone, data_nascimento} = req.body;
    const usuario = await listaUsuarios.buscarId(id);

    if(!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado!"
        });
    }

    const usuarioAtualizado = await listaUsuarios.editar(id, nome_completo, cpf, email, telefone, data_nascimento);
    res.json(usuarioAtualizado);
};

const deletarUsuario = async (req, res) => {
    const id = req.params.id;
    const usuarioDeletar = await listaUsuarios.buscarId(id);

    if(usuarioDeletar === -1) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado!"
        });
    }

    await listaUsuarios.deletar(id);

    res.json({
        mensagem: "Usuário deletado!"
    });
};

module.exports = {
    listarUsuarios,
    criarUsuario,
    pesquisarUsuario,
    atualizarUsuario,
    deletarUsuario
}