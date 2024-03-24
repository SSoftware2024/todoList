<?php
namespace ToDoList\App\Helper;
final class Auth
{
    public static function login(object $user)
    {
        session_start();   
        $_SESSION['user'] = $user;
        session_destroy();
    }
    public static function check()
    {
        return isset($_SESSION['user']) && !empty($_SESSION['user']);
    }
    public static function logout()
    {
        session_start();   
        if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
            unset($_SESSION['user']);
        }
        session_destroy();
    }


}
