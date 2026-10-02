const db = require("../config/db");

const buscarTodos = async () => {
    const [livros] = await db.query(
        "SELECT * FROM Livros;"
    );

    return livros;
};

const buscarId = async (id) => {
    const [livros] = await db.query(
        "SELECT * FROM Livros WHERE id = ?;",
        [id]
    );

    return livros[0];
};

const criar = async (título, isbn, ano_publicacao, numero_paginas, sinopse) => {
    const [livro] = await db.query(
        "INSERT INTO Livros (título, isbn, ano_publicacao, numero_paginas, sinopse) VALUES (?, ?, ?, ?, ?);",
        [título, isbn, ano_publicacao, numero_paginas, sinopse]
    );

    return {
        id: livro.insertId,
        título,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    };
};

const editar = async (id, título, isbn, ano_publicacao, numero_paginas, sinopse) => {
    await db.query(
        "UPDATE Livros SET título=?, isbn=?, ano_publicacao=?, numero_paginas=?, sinopse=? WHERE id=?;",
        [título, isbn, ano_publicacao, numero_paginas, sinopse, id]
    );

    return {
        id,
        título,
        isbn,
        ano_publicacao,
        numero_paginas,
        sinopse
    };
};

const deletar = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM Livros WHERE id=?;",
        [id]
    );

    return resultado.affectedRows;
};

const buscarPorAutor = async (autorId) => {
    const [livros] = await db.query(
        `SELECT l.* FROM Livros l
         INNER JOIN Autores_Livros al ON l.id = al.livros_id
         WHERE al.autores_id = ?;`,
        [autorId]
    );

    return livros;
};

const buscarEmprestimosPorLivro = async (livroId) => {
    const [emprestimos] = await db.query(
        "SELECT * FROM Emprestimos WHERE livros_id = ?;",
        [livroId]
    );

    return emprestimos;
};

module.exports = {
    buscarTodos,
    buscarId,
    criar,
    editar,
    deletar,
    buscarPorAutor,
    buscarLivrosPorAutor: buscarPorAutor,
    buscarEmprestimosPorLivro,
    buscarEmprestimos: buscarEmprestimosPorLivro
};