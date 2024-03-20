<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
include_once "../../constants.php";
require BASE_PATH.'/vendor/autoload.php';
require BASE_PATH.'/database/connection.php';

echo json_encode([
    'data' => 'teste'
]);