<?php
$database = [
    'driver' => env('DATABASE_DRIVER', 'sqlite'),
    'host' => env('DATABASE_HOST', 'database.sqlite'),

];
try {
    $pdo = new PDO("sqlite:" . $database['host']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão com: ". $database['driver'] ." ". $e->getMessage();
}
