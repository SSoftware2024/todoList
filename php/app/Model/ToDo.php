<?php
namespace ToDoList\App\Model;

final class ToDo
{
    public int $user_id = 0;
    public int $id = 0;
    public function create(string $task):bool
    {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO todoList (user_id, task) VALUES (?, ?)");
        return $stmt->execute([$this->user_id, $task]);
    }
    public function update(string $task):bool
    {
        global $pdo;
        $stmt = $pdo->prepare("UPDATE todoList SET task = ? WHERE user_id = ? AND id = ?");
        return $stmt->execute([$task, $this->user_id, $this->id]);
    }
    public function delete():bool
    {
        global $pdo;
        $stmt = $pdo->prepare("DELETE FROM todoList WHERE id = ?");
        return $stmt->execute([$this->id]);
    }
    public function list(int $page = 0, int $limit = 10):array
    {
        global $pdo;
        $stmt = $pdo->prepare("SELECT * FROM todoList WHERE user_id = ?;");
        $stmt->execute([$this->user_id]);
        $tasks = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $tasks;
    }
}
