<?php
require "../../constants.php";
require BASE_PATH.'/vendor/autoload.php';
use ToDoList\App\Model\User;

$user = new User();
$user->sayHello();
echo env('key env');
// echo $_SERVER['DOCUMENT_ROOT'];