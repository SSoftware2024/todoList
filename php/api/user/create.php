<?php
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


use ToDoList\App\Model\User;

$dataJson = file_get_contents('php://input');
$input = json_decode($dataJson, true);
$user = new User();
$data = '';

if(!$user->verifyEmail($input)){
    $login_user = $user->create([
        'name' => $input['name'],
        'email' =>  $input['email'],
        'password' =>  $input['password']
    ]);
    $code = '';
    do {
        $code = $user->generate();
    } while ($user->verifyCode($code));
    
    $user->insertCode($code);
    $data = [
        'message' => getData('Cadastro concluído com sucesso', 'success', http_response_code()),
        'recovery_code' => $code,
    ];
}else{
    $data = getData('Email já cadastrado', 'warning', http_response_code());
    
}
echo json_encode($data);