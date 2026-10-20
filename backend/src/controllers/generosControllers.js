const listaGeneros = require("../models/generosModels");

const listarGeneros = async (req, res) => {
    try {
        const generos = await listaGeneros.buscarTodos();
        res.json(generos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar gêneros." });
    }
};

const pesquisarGenero = async (req, res) => {
    try {
        const id = req.params.id;
        const genero = await listaGeneros.buscarId(id);

        if(!genero) {
            return res.status(404).json({
                mensagem: "Gênero não encontrado!"
            });
        }

        res.json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar gênero." });
    }
};

const criarGenero = async (req, res) => {
    try {
        const { nome } = req.body;
        const novoGenero = await listaGeneros.criar(nome);

        res.status(201).json(novoGenero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao criar gênero." });
    }
};

const atualizarGenero = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao atualizar gênero." });
    }
};

const deletarGenero = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao deletar gênero." });
    }
};

module.exports = {
    listarGeneros,
    pesquisarGenero,
    criarGenero,
    atualizarGenero,
    deletarGenero
};