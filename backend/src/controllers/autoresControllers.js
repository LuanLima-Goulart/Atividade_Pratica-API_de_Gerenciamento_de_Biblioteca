const listaAutores = require("../models/autoresModels");

const listarAutores = async (req, res) => {
    try {
        const autores = await listaAutores.buscarTodos();
        res.json(autores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar autores." });
    }
};

const pesquisarAutor = async (req, res) => {
    try {
        const id = req.params.id;
        const autor = await listaAutores.buscarId(id);

        if(!autor) {
            return res.status(404).json({
                mensagem: "Autor não encontrado!"
            });
        }

        res.json(autor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar autor." });
    }
};

const criarAutor = async (req, res) => {
    try {
        const {nome_completo, nacionalidade, data_nascimento} = req.body;
        const novoAutor = await listaAutores.criar(nome_completo, nacionalidade, data_nascimento);

        res.status(201).json(novoAutor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao criar autor." });
    }
};

const atualizarAutor = async (req, res) => {
    try {
        const id = req.params.id;
        const {nome_completo, nacionalidade, data_nascimento} = req.body;
        const autor = await listaAutores.buscarId(id);

        if(!autor) {
            return res.status(404).json({
                mensagem: "Autor não encontrado!"
            });
        }

        const autorAtualizado = await listaAutores.editar(id, nome_completo, nacionalidade, data_nascimento);
        res.json(autorAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao atualizar autor." });
    }
};

const deletarAutor = async (req, res) => {
    try {
        const id = req.params.id;
        const autorDeletar = await listaAutores.buscarId(id);

        if(!autorDeletar || autorDeletar === -1) {
            return res.status(404).json({
                mensagem: "Autor não encontrado!"
            });
        }

        await listaAutores.deletar(id);

        res.json({
            mensagem: "Autor deletado!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao deletar autor." });
    }
};

module.exports = {
    listarAutores,
    pesquisarAutor,
    criarAutor,
    atualizarAutor,
    deletarAutor
};
