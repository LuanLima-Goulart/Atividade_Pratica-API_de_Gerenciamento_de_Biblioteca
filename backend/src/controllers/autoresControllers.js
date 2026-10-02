const listaAutores = require("../models/autoresModels");

const listarAutores = async (req, res) => {
    const autores = await listaAutores.buscarTodos();

    res.json(autores);
};

const pesquisarAutor = async (req, res) => {
    const id = req.params.id
    const autor = await listaAutores.buscarId(id);

    if(!autor) {
        return res.status(404).json({
            mensagem: "Autor não encontrado!"
        });
    }

    res.json(autor);
};

const criarAutor = async (req, res) => {
    const {nome_completo, nacionalidade, data_nascimento} = req.body;
    const novoAutor = await listaAutores.criar(nome_completo, nacionalidade, data_nascimento);

    res.status(201).json(novoAutor);
};

const atualizarAutor = async (req, res) => {
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
};

const deletarAutor = async (req, res) => {
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
};

module.exports = {
    listarAutores,
    pesquisarAutor,
    criarAutor,
    atualizarAutor,
    deletarAutor
}