<?php

namespace ToDoList\App\Model;

final class ToDo
{
    public int $user_id = 0;
    public int $id = 0;
    public function create(string $task): bool
    {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO todoList (user_id, task) VALUES (?, ?)");
        return $stmt->execute([$this->user_id, $task]);
    }
    public function update(string $task): bool
    {
        global $pdo;
        $stmt = $pdo->prepare("UPDATE todoList SET task = ? WHERE user_id = ? AND id = ?");
        return $stmt->execute([$task, $this->user_id, $this->id]);
    }
    public function delete(): bool
    {
        global $pdo;
        $stmt = $pdo->prepare("DELETE FROM todoList WHERE id = ?");
        return $stmt->execute([$this->id]);
    }

    private function offset(int $page, int $limit)
    {
        $offeset = 0;
        if($page == 2){
            $offeset = $limit;//
        }else if($page > 2){
            $offeset =  $limit * $page - $limit;
        }
        return $offeset;
        
    }
    public function allPages(int $limit)
    {
        global $pdo;
        $stmt = $pdo->prepare("SELECT COUNT(*) AS total FROM todoList WHERE user_id = ?");
        $stmt->execute([$this->user_id]);
        $tasks = $stmt->fetch(\PDO::FETCH_ASSOC);

        $total = $tasks['total']  < $limit ? 0 : (int) ceil($tasks['total'] / $limit);
        return $total;
        
    }
    public function list(int $page = 0, int $limit = 10): array
    {
        global $pdo;
        $offeset = $this->offset($page, $limit);
        $stmt = $pdo->prepare("SELECT * FROM todoList WHERE user_id = ? LIMIT ? OFFSET ?;");
        $stmt->execute([$this->user_id, $limit, $offeset]);
        $tasks = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return $tasks;
    }
}
