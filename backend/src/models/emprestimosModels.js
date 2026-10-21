const db = require("../config/db");

const buscarTodos = async () => {
    const [emprestimos] = await db.query(
        `SELECT
            e.id AS id_Emprestimos,
            u.nome_completo AS nome_Usuarios,
            l.título AS nome_Livros,
            GROUP_CONCAT(a.nome_completo SEPARATOR ', ') AS nome_Autores,
            e.data_emprestimo, 
            e.data_devolucao
        FROM Emprestimos e
        INNER JOIN Usuarios u ON e.usuarios_id = u.id
        INNER JOIN Livros l ON e.livros_id = l.id
        LEFT JOIN Autores_Livros al ON l.id = al.livros_id
        LEFT JOIN Autores a ON al.autores_id = a.id
        GROUP BY e.id, u.nome_completo, l.título, e.data_emprestimo, e.data_devolucao;`
    );

    return emprestimos;
};

const buscarId = async (id) => {
    const [emprestimos] = await db.query(
        `SELECT
            e.id AS id_Emprestimos,
            u.nome_completo AS nome_Usuarios,
            l.título AS nome_Livros,
            GROUP_CONCAT(a.nome_completo SEPARATOR ', ') AS nome_Autores,
            e.data_emprestimo,
            e.data_devolucao
        FROM Emprestimos e
        INNER JOIN Usuarios u ON e.usuarios_id = u.id
        INNER JOIN Livros l ON e.livros_id = l.id
        LEFT JOIN Autores_Livros al ON l.id = al.livros_id
        LEFT JOIN Autores a ON al.autores_id = a.id
        WHERE e.id = ?
        GROUP BY e.id, u.nome_completo, l.título, e.data_emprestimo, e.data_devolucao;`,
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