<?php
include_once "../../constants.php";
include_once BASE_PATH . 'database/connection.php';
require BASE_PATH . 'vendor/autoload.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: ' . ALLOW_ORIGIN);
    header('Access-Control-Allow-Methods: GET,OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
header('Access-Control-Allow-Origin: ' . ALLOW_ORIGIN);
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
session_start();
error_reporting(0);

use ToDoList\App\Model\ToDo;
use ToDoList\App\Model\User;


try {
    $user = (new User())->loadUser($_GET['id']);
    $task = new ToDo();
    $task->user_id = $user->id;
    $data = $task->list();
} catch (\Exception $e) {
    $data = getData($e->getMessage(),'warning',$e->getCode());
} catch (\Error $e) {
    $data = getData($e->getMessage(),'error',$e->getCode());
}

echo json_encode($data);