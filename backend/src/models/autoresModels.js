const db = require("../config/db");

const buscarTodos = async () => {
    const [autores] = await db.query(
        "SELECT * FROM Autores;"
    );

    return autores;
};

const buscarId = async (id) => {
    const [autores] = await db.query(
        "SELECT * FROM Autores WHERE id = ?"
    );

    return autores[0];
};

const criar = async (nome_completo, nacionalidade, data_nascimento) => {
    const autores = await db.query(
        "INSERT INTO Autores (nome_completo, nacionalidade, data_nascimento) VALUES (?,?,?);",
        [nome_completo, nacionalidade, data_nascimento]
    );

    return {
        id: autores.insertId,
        nome_completo,
        nacionalidade,
        data_nascimento
    };
};

const editar = async (id, nome_completo, nacionalidade, data_nascimento) => {
    const autores = await db.query(
        "UPDATE Autores SET nome_completo=?, nacionalidade=?, data_nascimento=? WHERE id=?",
        [nome_completo, nacionalidade, data_nascimento, id]
    );

    return {
        nome_completo,
        nacionalidade,
        data_nascimento
    };
};

const deletar = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM Autores WHERE id=?",
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