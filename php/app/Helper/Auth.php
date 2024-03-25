<?php
namespace ToDoList\App\Helper;
final class Auth
{
    public static function login(object $user)
    { 
        $_SESSION['user'] = $user;
    }
    public static function check()
    {
        return isset($_SESSION['user']) && !empty($_SESSION['user']);
    }
    public static function logout()
    { 
        if(isset($_SESSION['user']) && !empty($_SESSION['user'])){
            unset($_SESSION['user']);
        }
    }
    public static function user():object|null
    { 
        if(Auth::check()){
            return $_SESSION['user'];
        }else{
            return null;
        }
        
    }


}
