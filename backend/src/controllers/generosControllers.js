const listaGeneros = require("../models/generosModels");

const listarGeneros = async (req, res) => {
    const generos = await listaGeneros.buscarTodos();

    res.json(generos);
};

const pesquisarGenero = async (req, res) => {
    const id = req.params.id;
    const genero = await listaGeneros.buscarId(id);

    if(!genero) {
        return res.status(404).json({
            mensagem: "Gênero não encontrado!"
        });
    }

    res.json(genero);
};

const criarGenero = async (req, res) => {
    const { nome } = req.body;
    const novoGenero = await listaGeneros.criar(nome);

    res.status(201).json(novoGenero);
};

const atualizarGenero = async (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;
    const genero = await listaGeneros.buscarId(id);

    if(!genero) {
        return res.status(404).json({
            mensagem: "Gênero não encontrado!"
        });
    }

    const generoAtualizado = await listaGeneros.editar(id, nome);
    res.json(generoAtualizado);
};

const deletarGenero = async (req, res) => {
    const id = req.params.id;
    const generoDeletar = await listaGeneros.buscarId(id);

    if(!generoDeletar || generoDeletar === -1) {
        return res.status(404).json({
            mensagem: "Gênero não encontrado!"
        });
    }

    await listaGeneros.deletar(id);

    res.json({
        mensagem: "Gênero deletado!"
    });
};

module.exports = {
    listarGeneros,
    pesquisarGenero,
    criarGenero,
    atualizarGenero,
    deletarGenero
};