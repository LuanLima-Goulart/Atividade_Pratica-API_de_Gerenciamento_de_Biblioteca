const listaEmprestimo = require("../models/emprestimosModels");

const listarEmprestimos = async (req, res) => {
    const emprestimos = await listaEmprestimo.buscarTodos();

    res.json(emprestimos);
};

const pesquisarEmprestimo = async (req, res) => {
    const id = req.params.id;
    const emprestimo = await listaEmprestimo.buscarId(id);

    if(!emprestimo) {
        return res.status(404).json({
            mensagem: "Empréstimo não encontrado!"
        });
    }

    res.json(emprestimo);
};

const criarEmprestimo = async (req, res) => {
    const { data_emprestimo, data_devolucao, usuarios_id, livros_id } = req.body;
    const novoEmprestimo = await listaEmprestimo.criar(data_emprestimo, data_devolucao, usuarios_id, livros_id);

    res.status(201).json(novoEmprestimo);
};

const atualizarEmprestimo = async (req, res) => {
    const id = req.params.id;
    const { data_emprestimo, data_devolucao, usuarios_id, livros_id } = req.body;
    const emprestimo = await listaEmprestimo.buscarId(id);

    if(!emprestimo) {
        return res.status(404).json({
            mensagem: "Empréstimo não encontrado!"
        });
    }

    const emprestimoAtualizado = await listaEmprestimo.editar(id, data_emprestimo, data_devolucao, usuarios_id, livros_id);
    res.json(emprestimoAtualizado);
};

const deletarEmprestimo = async (req, res) => {
    const id = req.params.id;
    const emprestimoDeletar = await listaEmprestimo.buscarId(id);

    if(!emprestimoDeletar || emprestimoDeletar === -1) {
        return res.status(404).json({
            mensagem: "Empréstimo não encontrado!"
        });
    }

    await listaEmprestimo.deletar(id);

    res.json({
        mensagem: "Empréstimo deletado!"
    });
};

const buscarEmprestimosPorLivro = async (req, res) => {
    const livroId = req.params.id || req.params.livroId;
    const emprestimos = await listaEmprestimo.buscarPorLivro(livroId);

    res.json(emprestimos);
};

module.exports = {
    listarEmprestimos,
    pesquisarEmprestimo,
    criarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo,
    buscarEmprestimosPorLivro
};