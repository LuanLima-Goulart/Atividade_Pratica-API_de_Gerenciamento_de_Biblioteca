const db = require("../config/db");

const buscarTodos = async () => {
    const [usuarios] = await db.query(
        "SELECT * FROM Usuarios;"
    );

    return usuarios;
};

const buscarId = async (id) => {
    const [usuarios] = await db.query(
        "SELECT * FROM Usuarios WHERE id = ?;",
        [id]
    );

    return usuarios[0];
};

const criar = async (nome_completo, cpf, email, telefone, data_nascimento) => {
    const [resultado] = await db.query(
        "INSERT INTO Usuarios (nome_completo, cpf, email, telefone, data_nascimento) VALUES (?, ?, ?, ?, ?);",
        [nome_completo, cpf, email, telefone, data_nascimento]
    );

    return {
        id: resultado.insertId,
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    };
};

const editar = async (id, nome_completo, cpf, email, telefone, data_nascimento) => {
    await db.query(
        "UPDATE Usuarios SET nome_completo=?, cpf=?, email=?, telefone=?, data_nascimento=? WHERE id=?;",
        [nome_completo, cpf, email, telefone, data_nascimento, id]
    );

    return {
        id,
        nome_completo,
        cpf,
        email,
        telefone,
        data_nascimento
    };
};

const deletar = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM Usuarios WHERE id=?;",
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
