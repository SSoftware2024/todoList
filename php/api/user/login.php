<?php

use ToDoList\App\Model\User;
include_once "../../constants.php";
include_once BASE_PATH . 'database/connection.php';
require BASE_PATH . 'vendor/autoload.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: '.ALLOW_ORIGIN);
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
header('Access-Control-Allow-Origin: '.ALLOW_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$dataJson = file_get_contents('php://input');
$input = json_decode($dataJson, true);


$user = new User();
$user = $user->getCheckUser($input['email'], $input['password']);

$data = null;
if($user){
    $data = [
        'name' => $user->name,
        'email' => $user->email,
    ];
}else{
    $data = getData('Usuário ou senha inválidos', 'error', 401);
}

echo json_encode($data);