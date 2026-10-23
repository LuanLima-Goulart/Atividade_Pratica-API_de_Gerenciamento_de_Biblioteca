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
    nome_completo,
    nomeCompleto,
    data_nascimento, 
    dataAniversario,
    email, 
    telefone,
    senha_hash,
    senhaHash,
    senha_salt,
    senhaSalt 
}) {
    const nome = (nome_completo !== undefined ? nome_completo : nomeCompleto) ?? null;
    const dataNasc = (data_nascimento !== undefined ? data_nascimento : dataAniversario) ?? null;
    const iv = (cpf_iv !== undefined ? cpf_iv : cpfIv) ?? null;
    const tag = (cpf_tag !== undefined ? cpf_tag : cpfTag) ?? null;
    const hash = (senha_hash !== undefined ? senha_hash : senhaHash) ?? null;
    const salt = (senha_salt !== undefined ? senha_salt : senhaSalt) ?? null;
    const tel = telefone ?? null;
    const mail = email ?? null;
    const userCpf = cpf ?? null;

    const sql = `
        INSERT INTO Usuarios (cpf, cpf_iv, cpf_tag, nome_completo, data_nascimento, email, telefone, senha_hash, senha_salt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [resultado] = await db.execute(sql, [
        userCpf, iv, tag, nome, dataNasc, mail, tel, hash, salt
    ]);

    return {
        id: resultado.insertId,
        nome_completo: nome,
        email: mail,
        telefone: tel,
        data_nascimento: dataNasc
    };
}

async function editar(id, dados) {
    const mapaColunas = {
        cpf: "cpf",
        cpfIv: "cpf_iv",
        cpf_iv: "cpf_iv",
        cpfTag: "cpf_tag",
        cpf_tag: "cpf_tag",
        nome_completo: "nome_completo",
        nomeCompleto: "nome_completo",
        nome_completp: "nome_completo",
        data_nascimento: "data_nascimento",
        dataNascimento: "data_nascimento",
        data_aniversario: "data_nascimento",
        dataAniversario: "data_nascimento",
        email: "email",
        telefone: "telefone",
        senha_hash: "senha_hash",
        senhaHash: "senha_hash",
        senha_salt: "senha_salt",
        senhaSalt: "senha_salt"
    };

    const chaves = Object.keys(dados);

    /* Verifica se há pelo menos um campo e se todos os campos são válidos */
    if (chaves.length === 0 || chaves.some(chave => !mapaColunas[chave])) {
        throw new Error("Variáveis de atualização inválidas");
    }

    const colunasAtualizar = {};
    for (const chave of chaves) {
        const colunaReal = mapaColunas[chave];
        colunasAtualizar[colunaReal] = dados[chave] ?? null;
    }

    const colunas = Object.keys(colunasAtualizar);
    const atribuicoes = colunas.map(coluna => `${coluna} = ?`).join(", ");
    const valores = colunas.map(coluna => colunasAtualizar[coluna]);

    const sql = `
        UPDATE Usuarios
        SET ${atribuicoes}
        WHERE id = ?;
    `;
    // spread operator
    const [resultado] = await db.execute(sql, [...valores, id]);

    return resultado;
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