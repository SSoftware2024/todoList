<?php
namespace ToDoList\App\Model;

final class ToDo
{
    public int $user_id = 0;
    public function create(string $task):bool
    {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO todoList (user_id, task) VALUES (?, ?)");
        return $stmt->execute([$this->user_id, $task]);
    }
}
