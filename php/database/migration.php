<?php
include 'connection.php';

// Criar tabela users
$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        password TEXT,
        token TEXT NULL
    );
");

// Criar tabela todoList
$pdo->exec("
    CREATE TABLE IF NOT EXISTS todoList (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        task TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
");

// Inserir dados na tabela users
$pdo->exec("
    INSERT INTO users (id, name, email, password) VALUES (1, 'demo', 'demo@example.com', '".password_hash('senha123', PASSWORD_DEFAULT)."');
");


