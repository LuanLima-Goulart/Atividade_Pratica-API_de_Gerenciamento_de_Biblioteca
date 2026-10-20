const dotenv = require("dotenv");
dotenv.config();

const crypto = require("crypto");

const ALGORITIMO = "aes-256-gcm";
const chaveHex = process.env.CRYPTO_KEY || "4c9e8fb9056bc0b257b5757de35279d96b0c15bb14bf3c170b89d99e1c8d1d11";
const CHAVE = Buffer.from(chaveHex, "hex");

if(CHAVE.length !== 32) {
    throw new Error("Invalid CRYPTO_KEY: A chave precisa ter 32 bytes");
}

function criptografar(valor) {
    const textoValor = String(valor ?? "");
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITIMO, CHAVE, iv);

    const valorCriptografado = Buffer.concat([cipher.update(textoValor, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return {
        iv,
        tag,
        valorCriptografado
    };
}

function descriptografar({ivArmazenado, tagArmazenado, tagArmazenada, valorArmazenado}) {
    const tag = tagArmazenado || tagArmazenada;
    if (!ivArmazenado || !tag || !valorArmazenado) {
        return null;
    }

    const ivBuf = Buffer.isBuffer(ivArmazenado) ? ivArmazenado : Buffer.from(ivArmazenado);
    const tagBuf = Buffer.isBuffer(tag) ? tag : Buffer.from(tag);
    const valorBuf = Buffer.isBuffer(valorArmazenado) ? valorArmazenado : Buffer.from(valorArmazenado);

    const decipher = crypto.createDecipheriv(ALGORITIMO, CHAVE, ivBuf);
    decipher.setAuthTag(tagBuf);

    const valorDescriptografado = Buffer.concat([decipher.update(valorBuf), decipher.final()]);

    return valorDescriptografado.toString("utf8");
}

module.exports = {
    criptografar,
    descriptografar
};