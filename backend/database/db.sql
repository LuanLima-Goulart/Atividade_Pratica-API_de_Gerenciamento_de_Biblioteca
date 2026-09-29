DROP DATABASE IF EXISTS Biblioteca;
CREATE DATABASE Biblioteca;
USE Biblioteca;

CREATE TABLE Autores (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome_completo VARCHAR(80) NOT NULL,
    nacionalidade VARCHAR(80) NOT NULL,
    data_nascimento DATE
);

CREATE TABLE Autores_Livros (
    Autores_id INT,
    Livros_id INT,
    CONSTRAINT FK_Autores_id FOREIGN KEY (Autores_id) REFERENCES Autores(id) ON DELETE CASCADE,
    CONSTRAINT FK_Livros_id FOREIGN KEY (Livros_id) REFERENCES Livros(id) ON DELETE CASCADE
);

CREATE TABLE Livros (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    título VARCHAR(200) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    ano_publicacao YEAR NOT NULL,
    numero_paginas INT NOT NULL,
    sinopse TEXT NOT NULL
);