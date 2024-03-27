<?php
include_once "../../constants.php";
include_once BASE_PATH . 'database/connection.php';
require BASE_PATH . 'vendor/autoload.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: ' . ALLOW_ORIGIN);
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
header('Access-Control-Allow-Origin: ' . ALLOW_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
session_start();
error_reporting(0);
use ToDoList\App\Model\User;

$dataJson = file_get_contents('php://input');
$input = json_decode($dataJson, true);
$user = new User();
$data = '';

try {
    $userObj = $user->loadUserCode($input['code']);
    $user->id = $userObj->id;

    if ($input['code'] == $userObj->code) {
        $code = '';
        do {
            $code = $user->generate();
        } while ($user->verifyCode($code));

        $user->insertCode($code);
        $data = [
            'isVerified' => true,
            'newCode' => $code,
            'id' => $userObj->id
        ];
    } else {
        $data = getData('Código inválido!', 'error', http_response_code());
    }
} catch (\Error $e) {
    $data = getData($e->getMessage(), 'error', $e->getCode());
}
echo json_encode($data);
