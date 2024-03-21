<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
include_once "../../constants.php";
include_once BASE_PATH . 'database/connection.php';
require BASE_PATH . 'vendor/autoload.php';

use ToDoList\App\Model\User;

$dataJson = file_get_contents('php://input');
$input = json_decode($dataJson, true);
$user = new User();
$data = '';
$result = $user->create([
    'name' => $input['name'],
    'email' =>  $input['email'],
    'password' =>  $input['password']
]);

$data = getData('Cadastro realizado com sucesso', 'success', http_response_code());
if (!is_numeric($result)) {
    $data = $result;
}
echo json_encode($data);
