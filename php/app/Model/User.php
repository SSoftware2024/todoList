<?php

namespace ToDoList\App\Model;

include_once '../../constants.php';
include_once BASE_PATH . 'vendor/autoload.php';
final class User
{
    public function create(array $values, $id = 0):string|array|false
    {
        global $pdo;
        if(!$this->verifyEmail([...$values, 'id' => $id])){
            $values['password'] = password_hash($values['password'], PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$values['name'], $values['email'], $values['password']]);
            return $pdo->lastInsertId();
        }else{
            return getData('Email já cadastrado','warning', http_response_code());
        }
    }


    private function verifyEmail($values, $operate = 'create'){
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
}
