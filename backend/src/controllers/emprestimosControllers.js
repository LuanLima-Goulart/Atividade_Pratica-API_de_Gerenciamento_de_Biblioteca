const listaEmprestimo = require("../models/emprestimosModels");

const listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await listaEmprestimo.buscarTodos();
        res.json(emprestimos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar empréstimos." });
    }
};

const pesquisarEmprestimo = async (req, res) => {
    try {
        const id = req.params.id;
        const emprestimo = await listaEmprestimo.buscarId(id);

        if(!emprestimo) {
            return res.status(404).json({
                mensagem: "Empréstimo não encontrado!"
            });
        }

        res.json(emprestimo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar empréstimo." });
    }
};

const criarEmprestimo = async (req, res) => {
    try {
        const { data_emprestimo, data_devolucao, usuarios_id, livros_id } = req.body;
        const novoEmprestimo = await listaEmprestimo.criar(data_emprestimo, data_devolucao, usuarios_id, livros_id);

        res.status(201).json(novoEmprestimo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao criar empréstimo." });
    }
};

const atualizarEmprestimo = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao atualizar empréstimo." });
    }
};

const deletarEmprestimo = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao deletar empréstimo." });
    }
};

const buscarEmprestimosPorLivro = async (req, res) => {
    try {
        const livroId = req.params.id || req.params.livroId;
        const emprestimos = await listaEmprestimo.buscarPorLivro(livroId);

        res.json(emprestimos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao buscar empréstimos do livro." });
    }
};

module.exports = {
    listarEmprestimos,
    pesquisarEmprestimo,
    criarEmprestimo,
    atualizarEmprestimo,
    deletarEmprestimo,
    buscarEmprestimosPorLivro
};