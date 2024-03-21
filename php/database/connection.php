<?php

try {
    $pdo = new PDO("sqlite:" . 'D:\laragon\www\a_php\todoList\php\database\database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão com: sqlite: ".$e->getMessage();
}
