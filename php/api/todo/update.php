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
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
session_start();
error_reporting(0);

$dataJson = file_get_contents('php://input');
$input = json_decode($dataJson, true);

use ToDoList\App\Model\ToDo;
use ToDoList\App\Model\User;

try {
    $user = (new User())->loadUser($input['user_id']);
    $task = new ToDo();
    $task->user_id = $user->id;
    $task->id = $input['id'];
    $task->update($input['task']);
    $data = getData('Atualização realizada com sucesso','success',http_response_code());
} catch (\Exception $e) {
    $data = getData($e->getMessage(),'warning',$e->getCode());
} catch (\Error $e) {
    $data = getData($e->getMessage(),'error',$e->getCode());
}

echo json_encode($data);