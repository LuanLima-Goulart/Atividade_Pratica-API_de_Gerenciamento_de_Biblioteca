const crypto = require("crypto");

const { promisify } = require("util");
const scrypt = promisify(crypto.scrypt);

async function gerarHashSenha(senha) {
    const textoSenha = String(senha ?? "");
    const salt = crypto.randomBytes(16);
    const hash = await scrypt(textoSenha, salt, 64);

    return { salt, hash };
}

async function verificarHashSenha(senha, params = {}) {
    const salt = params.saltArmazenado || params.saltAramazenado || params.salt;
    const hashArmazenado = params.hashSenhaArmazenado || params.hash;

    if (!salt || !hashArmazenado) {
        return false;
    }

    const saltBuf = Buffer.isBuffer(salt) ? salt : Buffer.from(salt);
    const hashArmazenadoBuf = Buffer.isBuffer(hashArmazenado) ? hashArmazenado : Buffer.from(hashArmazenado);

    const textoSenha = String(senha ?? "");
    const novoHash = await scrypt(textoSenha, saltBuf, 64);

    if (hashArmazenadoBuf.length !== novoHash.length) {
        return false;
    }

    return crypto.timingSafeEqual(hashArmazenadoBuf, novoHash);
}

module.exports = {
    gerarHashSenha,
    verificarHashSenha
};