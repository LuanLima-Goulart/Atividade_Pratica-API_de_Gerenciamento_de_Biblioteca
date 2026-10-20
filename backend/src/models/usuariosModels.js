const db = require("../config/db");

async function buscarTodos() {
    const sql = `
        SELECT id, nome_completo, cpf, cpf_iv, cpf_tag, email, telefone, data_nascimento 
        FROM Usuarios;
    `;
    const [resultado] = await db.execute(sql);

    return resultado;
}

async function buscarPorId(id) {
    const sql = `SELECT * FROM Usuarios WHERE id = ?;`;
    const [resultado] = await db.execute(sql, [id]);

    return resultado[0] || null;
}

async function criar({ 
    cpf, 
    cpfIv, 
    cpf_iv, 
    cpfTag, 
    cpf_tag, 
    nomeCompleto, 
    nome_completo, 
    dataAniversario, 
    data_nascimento, 
    email, 
    telefone, 
    senhaHash, 
    senha_hash, 
    senhaSalt, 
    senha_salt 
}) {
    const nome = nome_completo || nomeCompleto;
    const dataNasc = data_nascimento || dataAniversario;
    const iv = cpf_iv || cpfIv;
    const tag = cpf_tag || cpfTag;
    const hash = senha_hash || senhaHash;
    const salt = senha_salt || senhaSalt;

    const sql = `
        INSERT INTO Usuarios (cpf, cpf_iv, cpf_tag, nome_completo, data_nascimento, email, telefone, senha_hash, senha_salt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [resultado] = await db.execute(sql, [
        cpf, iv, tag, nome, dataNasc, email, telefone, hash, salt
    ]);

    return {
        id: resultado.insertId,
        nome_completo: nome,
        email,
        telefone,
        data_nascimento: dataNasc
    };
}

async function editar(id, { nome_completo, nomeCompleto, data_nascimento, dataAniversario, email, telefone, cpf, cpf_iv, cpf_tag, senha_hash, senha_salt }) {
    const nome = nome_completo || nomeCompleto;
    const dataNasc = data_nascimento || dataAniversario;

    if (cpf && cpf_iv && cpf_tag && senha_hash && senha_salt) {
        const sql = `
            UPDATE Usuarios 
            SET nome_completo = ?, data_nascimento = ?, email = ?, telefone = ?, cpf = ?, cpf_iv = ?, cpf_tag = ?, senha_hash = ?, senha_salt = ?
            WHERE id = ?;
        `;
        await db.execute(sql, [nome, dataNasc, email, telefone, cpf, cpf_iv, cpf_tag, senha_hash, senha_salt, id]);
    } else {
        const sql = `
            UPDATE Usuarios 
            SET nome_completo = ?, data_nascimento = ?, email = ?, telefone = ?
            WHERE id = ?;
        `;
        await db.execute(sql, [nome, dataNasc, email, telefone, id]);
    }

    return {
        id: Number(id),
        nome_completo: nome,
        data_nascimento: dataNasc,
        email,
        telefone
    };
}

async function excluir(id) {
    const sql = `DELETE FROM Usuarios WHERE id = ?;`;
    const [resultado] = await db.execute(sql, [id]);

    return resultado.affectedRows;
}

module.exports = {
    buscarTodos,
    buscarPorId,
    buscarId: buscarPorId,
    criar,
    editar,
    atualizar: editar,
    excluir,
    deletar: excluir
};