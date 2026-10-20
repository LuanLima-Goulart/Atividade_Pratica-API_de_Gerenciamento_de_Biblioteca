DROP DATABASE IF EXISTS Biblioteca;
CREATE DATABASE Biblioteca;
USE Biblioteca;

CREATE TABLE Autores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(80) NOT NULL,
    nacionalidade VARCHAR(80) NOT NULL,
    data_nascimento DATE
);

CREATE TABLE Livros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    título VARCHAR(200) NOT NULL,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    ano_publicacao YEAR NOT NULL,
    numero_paginas INT NOT NULL,
    sinopse TEXT NOT NULL
);

CREATE TABLE Generos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(150) NOT NULL, 
    cpf VARBINARY(32) NOT NULL,
    cpf_iv BINARY(12) NOT NULL,
    cpf_tag BINARY(16) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone BIGINT UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    senha_hash BINARY(64) NOT NULL,
    senha_salt BINARY(16) NOT NULL
);

CREATE TABLE Autores_Livros (
    autores_id INT NOT NULL,
    livros_id INT NOT NULL,
    PRIMARY KEY (autores_id, livros_id),
    CONSTRAINT FK_AutoresLivros_Autor FOREIGN KEY (autores_id) REFERENCES Autores(id) ON DELETE CASCADE,
    CONSTRAINT FK_AutoresLivros_Livro FOREIGN KEY (livros_id) REFERENCES Livros(id) ON DELETE CASCADE
);

CREATE TABLE Emprestimos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    usuarios_id INT NOT NULL,
    livros_id INT NOT NULL,
    CONSTRAINT FK_Emprestimos_Usuario FOREIGN KEY (usuarios_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    CONSTRAINT FK_Emprestimos_Livro FOREIGN KEY (livros_id) REFERENCES Livros(id) ON DELETE CASCADE
);

CREATE TABLE Livros_Generos (
    livros_id INT NOT NULL,
    generos_id INT NOT NULL,
    PRIMARY KEY (livros_id, generos_id),
    CONSTRAINT FK_LivrosGeneros_Livro FOREIGN KEY (livros_id) REFERENCES Livros(id) ON DELETE CASCADE,
    CONSTRAINT FK_LivrosGeneros_Genero FOREIGN KEY (generos_id) REFERENCES Generos(id) ON DELETE CASCADE
);

-- 1. Inserindo os Autores (A nata da literatura duvidosa)
INSERT INTO Autores (nome_completo, nacionalidade, data_nascimento) VALUES 
('Jorge R. R. Serasa', 'Brasileiro (Endividado)', '1948-09-20'),
('Pablo Coach Quântico', 'Faria Limer', '1985-04-01'),
('J.K. Rolando Lero', 'Cancelada', '1965-07-31'),
('Desenvolvedor Sênior de Taubaté', 'Cidadão do StackOverflow', '1995-10-31');

-- 2. Inserindo os Livros (Os maiores best-sellers da sua estante)
INSERT INTO Livros (título, isbn, ano_publicacao, numero_paginas, sinopse) VALUES 
('A Guerra dos Boletos', '1711711711711', 2026, 999, 'O inverno está chegando, e a fatura do cartão de crédito também. Famílias lutam para não cair no rotativo.'),
('Acorde às 4h da manhã e fique com sono o dia todo', '0000000000000', 2023, 12, 'Arrasta pra cima e compre meu curso para descobrir como fiquei rico vendendo este livro.'),
('Harry Potter e o Enigma do Imposto de Renda', '6666666666666', 2015, 500, 'Onde a verdadeira magia negra é tentar não cair na malha fina do Leão sem a ajuda de um contador bruxo.'),
('Na Minha Máquina Funciona', '4044044044040', 2020, 404, 'Contos de terror e suspense sobre fazer deploy na sexta-feira às 17h59 e ir embora.');

-- 3. Inserindo Gêneros (Categorias altamente específicas)
INSERT INTO Generos (nome) VALUES 
('Fantasia Financeira'),
('Charlatanismo (Autoajuda)'),
('Horror Tributário'),
('Tortura Psicológica (TI)');

-- 4. Inserindo Usuários
INSERT INTO Usuarios (id, nome_completo, cpf, cpf_iv, cpf_tag, email, telefone, data_nascimento, senha_hash, senha_salt) VALUES
(1, 'Zé do Calote', 0x6c9d5ab2423ccdac47345e8e0d5a, 0x3a2dcb2853db28863a8367b8, 0x5fec0b99571ab6b2eea64454ee3d173a, 'ze.calote@email.com', 11999991111, '1980-01-01', 0x63b91cd54bb2184c917f1084070ce443a982e9bff0fd59be30404114fc1b37a54f9cf158c4941dd3136feb7e63c12eef8489af36b726b51624867cb2a82037d5, 0x9c261d00f697f06e6a15ebe642f3c371),
(2, 'Enzo do Instagram', 0x16f9185aa1a815bce0ad08592c49, 0xaeeb1daf13b5e3d57c98aa1a, 0xd677633e39fb2f0ed875a162e951b6b6, 'enzo.investidor@email.com', 11988882222, '2004-06-15', 0x2490ac9b90992464069fca2fc3f058ba6ca3073ee613b39bdaa6fb305a1b2b0335d8c0506bfede2c92588919f63c0203d13b6a19672cc25f6baae450c5340a03, 0xa0245b3d0d6a3413207febfb04dc98bd),
(3, 'Desenvolvedor Cansado', 0x69d988d872f9906cac7340b01c57, 0x90953227e18892669e000338, 0x67305170b1aca0c4a9f371a31a52f6f7, 'dev.junior@email.com', 11977773333, '1998-12-05', 0x53d058d46d66d9035b12ffbae29769e83c4a8eb3a4d97bf361d9d6a082a560f6e6e1c6f7e9b6ce43d323a1c60d2164c8f8dbc29792108da0fae5619b53664683, 0x5b367691bf0dcac63c152cb012e99ce0);

-- 5. Relação Autores x Livros
INSERT INTO Autores_Livros (autores_id, livros_id) VALUES 
(1, 1), -- Jorge R. R. Serasa escreveu A Guerra dos Boletos
(2, 2), -- Pablo Coach escreveu o livro das 4h da manhã
(3, 3), -- J.K. Rolando Lero escreveu sobre o Imposto de Renda
(4, 4); -- Sênior de Taubaté escreveu Na Minha Máquina Funciona

-- 6. Relação Livros x Generos
INSERT INTO Livros_Generos (livros_id, generos_id) VALUES 
(1, 1), -- Guerra dos Boletos é Fantasia Financeira
(2, 2), -- Livro do Coach é Charlatanismo
(3, 3), -- Harry Potter é Horror Tributário
(4, 4); -- Livro de TI é Tortura Psicológica

-- 7. Inserindo Empréstimos (Prazos de devolução altamente questionáveis)
INSERT INTO Emprestimos (data_emprestimo, data_devolucao, usuarios_id, livros_id) VALUES 
('2020-01-01', '2099-12-31', 1, 1), -- Zé do Calote pegou em 2020 e a previsão de devolução é no próximo século
('2026-09-29', '2026-09-29', 2, 2), -- Enzo pegou o livro do coach, tirou foto pro Instagram fingindo que lê, e devolveu no mesmo dia
('2026-09-28', '2026-09-30', 3, 4), -- Dev alugou na segunda, chorou lendo o livro inteiro na terça, vai devolver na quarta
('2026-04-01', '2026-04-30', 1, 3); -- Zé do Calote tentou usar o livro de Harry Potter para sonegar imposto e desapareceu com a cópia
