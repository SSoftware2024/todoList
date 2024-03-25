<?php

namespace ToDoList\App\Model;

use ToDoList\App\Trait\Code;

include_once '../../constants.php';
include_once BASE_PATH . 'vendor/autoload.php';
final class User
{
    use Code;
    public int $id = 0;
    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->table = 'users';
    }
    
    public function create(array $values): object
    {
        global $pdo;
        $values['password'] = password_hash($values['password'], PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$values['name'], $values['email'], $values['password']]);
        $this->id = $pdo->lastInsertId();
        return $this->loadUser();
    }
    public function loadUser(int $id = 0): object
    {
        if($id > 0){
            $this->id = $id;
        }
        global $pdo;
        $sql = "SELECT * FROM users WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$this->id]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
        return (object) $user;
    }
    public function loadUserCode(string $code = ''): object
    {
        global $pdo;
        $sql = "SELECT * FROM users WHERE code = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$code]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
        return (object) $user;
    }
    public function getCheckUser(string $email, string $password):object|false
    {

        global $pdo;
        $sql = "SELECT * FROM users WHERE email = ? limit 1;";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
        $user =  (object) $user;

        if (password_verify($password, $user->password)) {
            return $user;
        } else {
            return false;
        }
    }


    public function verifyEmail($values, $operate = 'create')
    {
        global $pdo;
        $sql = "SELECT COUNT(*) as count_email FROM users WHERE email = ?";
        $execute = [$values['email']];
        switch ($operate) {
            case 'update':
                $sql .= " AND id != ?;";
                $execute = [...$execute, $values['id']];
                break;
            case 'create':
            default:
                $sql .= ";";
                break;
        }
        $stmt = $pdo->prepare($sql);
        $stmt->execute($execute);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
        return (bool) $user['count_email'];
    }


    public function newPassword(string $password):bool
    {
        if ($this->id > 0) {
            global $pdo;
            $stmt = $pdo->prepare("UPDATE 'users' SET password = ? WHERE id = ?;");
            return $stmt->execute([password_hash($password, PASSWORD_BCRYPT), $this->id]);
        } else {
            throw new \Exception("Id not defined");
        }
    }
}
