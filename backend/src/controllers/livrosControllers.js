const listaLivros = require("../models/livrosModels");

const listarLivros = async (req, res) => {
    try {
        const livros = await listaLivros.buscarTodos();
        // Garante que o campo titulo esteja disponível sem e com acento
        const formatados = livros.map(l => ({
            ...l,
            titulo: l.titulo || l["título"]
        }));
        res.json(formatados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar livros." });
    }
};

const pesquisarLivro = async (req, res) => {
    try {
        const id = req.params.id;
        const livro = await listaLivros.buscarId(id);

        if(!livro) {
            return res.status(404).json({
                mensagem: "Livro não encontrado!"
            });
        }

        res.json({
            ...livro,
            titulo: livro.titulo || livro["título"]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar livro." });
    }
};

const criarLivro = async (req, res) => {
    try {
        const { titulo, título, isbn, ano_publicacao, numero_paginas, sinopse } = req.body;
        const tituloLivro = título || titulo;
        const novoLivro = await listaLivros.criar(tituloLivro, isbn, ano_publicacao, numero_paginas, sinopse);

        res.status(201).json(novoLivro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao criar livro." });
    }
};

const atualizarLivro = async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, título, isbn, ano_publicacao, numero_paginas, sinopse } = req.body;
        const livro = await listaLivros.buscarId(id);

        if(!livro) {
            return res.status(404).json({
                mensagem: "Livro não encontrado!"
            });
        }

        const tituloLivro = título || titulo || livro.título || livro.titulo;
        const livroAtualizado = await listaLivros.editar(id, tituloLivro, isbn, ano_publicacao, numero_paginas, sinopse);
        res.json(livroAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao atualizar livro." });
    }
};

const deletarLivro = async (req, res) => {
    try {
        const id = req.params.id;
        const livroDeletar = await listaLivros.buscarId(id);

        if(!livroDeletar || livroDeletar === -1) {
            return res.status(404).json({
                mensagem: "Livro não encontrado!"
            });
        }

        await listaLivros.deletar(id);

        res.json({
            mensagem: "Livro deletado!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao deletar livro." });
    }
};

const buscarLivrosPorAutor = async (req, res) => {
    try {
        const autorId = req.params.id || req.params.autorId;
        const livros = await listaLivros.buscarPorAutor(autorId);

        res.json(livros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar livros do autor." });
    }
};

const buscarEmprestimosPorLivro = async (req, res) => {
    try {
        const id = req.params.id || req.params.livroId;
        const emprestimos = await listaLivros.buscarEmprestimosPorLivro(id);

        res.json(emprestimos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar empréstimos do livro." });
    }
};

module.exports = {
    listarLivros,
    pesquisarLivro,
    criarLivro,
    atualizarLivro,
    deletarLivro,
    buscarLivrosPorAutor,
    buscarEmprestimosPorLivro
};
