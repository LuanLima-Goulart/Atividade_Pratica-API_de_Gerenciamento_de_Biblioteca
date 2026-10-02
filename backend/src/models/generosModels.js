const db = require("../config/db");

const buscarTodos = async () => {
    const [generos] = await db.query(
        "SELECT * FROM Generos;"
    );

    return generos;
};

const buscarId = async (id) => {
    const [genero] = await db.query(
        "SELECT * FROM Generos WHERE id=?",
        [id]
    );

    return genero[0];
};

const criar = async (nome) => {
    const generos = await db.query(
        "INSERT INTO Generos (nome) VALUES (?);",
        [nome]
    );

    return {
        id: generos.insertId,
        nome
    }
};

const editar = async (id, nome) => {
    await db.query(
        "UPDATE Generos SET nome=? WHERE id=?;",
        [nome, id]
    );

    return {
        id,
        nome
    };
};

const deletar = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM Generos WHERE id=?",
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    buscarTodos,
    buscarId,
    criar,
    editar,
    deletar
};