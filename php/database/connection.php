<?php
require "../../constants.php";

try {
    $pdo = new PDO("sqlite:" . 'database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão com: ". $database['driver'] ." ". $e->getMessage();
}
