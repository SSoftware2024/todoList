<?php
require BASE_PATH . '/database/connection.php';
$pdo->exec("
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    email TEXT,
                    password TEXT
                );

                CREATE TABLE IF NOT EXISTS todoList (
                    id INTEGER PRIMARY KEY,
                    user_id INTEGER,
                    task TEXT,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                );

                INSERT INTO users (id, name, email, password) VALUES (1, 'demo', 'demo@example.com', 'senha123');
            ");
