<?php
require  $_SERVER['DOCUMENT_ROOT'].'/a_php/todoList/php/vendor/autoload.php'; //caminho ate autoload
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable($_SERVER['DOCUMENT_ROOT'].'/a_php/todoList/php/'); //caminho raiz
$dotenv->load();
function warningHandler($errno, $errstr) {
    throw new Exception($errstr, $errno);
}
set_error_handler("warningHandler", E_WARNING);


if (! function_exists('env')) {
    function env($key, $value = null)
    {
        
        try {
            return $_ENV[$key];
        } catch (\Exception $e) {
            if(empty($value) ){
                throw new \Error("Key env: $key not found and value null");
            }else{
                return $value;
            }
            
        }
    }
}