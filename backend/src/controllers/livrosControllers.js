const listaLivros = require("../models/livrosModels");

const listarLivros = async (req, res) => {
    const livros = await listaLivros.buscarTodos();

    res.json(livros);
};

const pesquisarLivro = async (req, res) => {
    const id = req.params.id;
    const livro = await listaLivros.buscarId(id);

    if(!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado!"
        });
    }

    res.json(livro);
};

const criarLivro = async (req, res) => {
    const { titulo, título, isbn, ano_publicacao, numero_paginas, sinopse } = req.body;
    const tituloLivro = título || titulo;
    const novoLivro = await listaLivros.criar(tituloLivro, isbn, ano_publicacao, numero_paginas, sinopse);

    res.status(201).json(novoLivro);
};

const atualizarLivro = async (req, res) => {
    const id = req.params.id;
    const { titulo, título, isbn, ano_publicacao, numero_paginas, sinopse } = req.body;
    const livro = await listaLivros.buscarId(id);

    if(!livro) {
        return res.status(404).json({
            mensagem: "Livro não encontrado!"
        });
    }

    const tituloLivro = título || titulo;
    const livroAtualizado = await listaLivros.editar(id, tituloLivro, isbn, ano_publicacao, numero_paginas, sinopse);
    res.json(livroAtualizado);
};

const deletarLivro = async (req, res) => {
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
};

const buscarLivrosPorAutor = async (req, res) => {
    const autorId = req.params.id || req.params.autorId;
    const livros = await listaLivros.buscarPorAutor(autorId);

    res.json(livros);
};

const buscarEmprestimosPorLivro = async (req, res) => {
    const id = req.params.id || req.params.livroId;
    const emprestimos = await listaLivros.buscarEmprestimosPorLivro(id);

    res.json(emprestimos);
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