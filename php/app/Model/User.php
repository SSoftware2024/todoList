<?php

namespace ToDoList\App\Model;

include_once '../../constants.php';
include_once BASE_PATH . 'vendor/autoload.php';
final class User
{
    public function create(array $values): string|array|false
    {
        global $pdo;
        $values['password'] = password_hash($values['password'], PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$values['name'], $values['email'], $values['password']]);
        return $pdo->lastInsertId();
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
}
