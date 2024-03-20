<?php

// require 'vendor/autoload.php';
// use Dotenv\Dotenv;
// $dotenv = Dotenv::createImmutable(__DIR__);
// $dotenv->load();

if (! function_exists('env')) {
    function env($key, $value = null)
    {
        echo $key;
    }
}