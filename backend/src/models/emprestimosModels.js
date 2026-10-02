const db = require("../config/db");

const buscarTodos = async () => {
    const [emprestimos] = await db.query(
        "SELECT * FROM Emprestimos;"
    );

    return emprestimos;
};

const buscarId = async (id) => {
    const [emprestimos] = await db.query(
        "SELECT * FROM Emprestimos WHERE id = ?;",
        [id]
    );

    return emprestimos[0];
};

const criar = async (data_emprestimo, data_devolucao, usuarios_id, livros_id) => {
    const [emprestimo] = await db.query(
        "INSERT INTO Emprestimos (data_emprestimo, data_devolucao, usuarios_id, livros_id) VALUES (?, ?, ?, ?);",
        [data_emprestimo, data_devolucao, usuarios_id, livros_id]
    );

    return {
        id: emprestimo.insertId,
        data_emprestimo,
        data_devolucao,
        usuarios_id,
        livros_id
    };
};

const editar = async (id, data_emprestimo, data_devolucao, usuarios_id, livros_id) => {
    await db.query(
        "UPDATE Emprestimos SET data_emprestimo=?, data_devolucao=?, usuarios_id=?, livros_id=? WHERE id=?;",
        [data_emprestimo, data_devolucao, usuarios_id, livros_id, id]
    );

    return {
        id,
        data_emprestimo,
        data_devolucao,
        usuarios_id,
        livros_id
    };
};

const deletar = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM Emprestimos WHERE id=?;",
        [id]
    );

    return resultado.affectedRows;
};

const buscarPorLivro = async (livros_id) => {
    const [emprestimos] = await db.query(
        "SELECT * FROM Emprestimos WHERE livros_id = ?;",
        [livros_id]
    );

    return emprestimos;
};

module.exports = {
    buscarTodos,
    buscarId,
    criar,
    editar,
    deletar,
    buscarPorLivro,
    buscarEmprestimosPorLivro: buscarPorLivro
};