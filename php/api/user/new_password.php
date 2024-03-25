<?php
include_once "../../constants.php";
include_once BASE_PATH . 'database/connection.php';
require BASE_PATH . 'vendor/autoload.php';
// error_reporting(0);
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: ' . ALLOW_ORIGIN);
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
header('Access-Control-Allow-Origin: ' . ALLOW_ORIGIN);
header('Access-Control-Allow-Methods: PACTH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

use ToDoList\App\Model\User;

$dataJson = file_get_contents('php://input');
$input = json_decode($dataJson, true);
$user = new User();
$data = '';

$userObj = $user->loadUser((int) $input['id']);
$user->id = $input['id'];

if (!empty($input['password'])) {
    try {
        $user->newPassword($input['password']);
        $data = getData('Senha atualizada com sucesso!', 'success', http_response_code());
    } catch (\Exception $e) {
        $data = getData($e->getMessage(), 'error', $e->getCode());
    }
}
echo json_encode($data);
