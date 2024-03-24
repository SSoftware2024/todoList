<?php

namespace ToDoList\App\Trait;

trait Code
{
    protected string $table = '';
    public function generate(): string
    {
        $string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $max_length = strlen($string);
        $new_string = [
            'first' => '',
            'second' => '',
        ];
        $size_code = 3; 

        for ($i = 0; $i < $size_code; $i++) {
            $new_string['first'] .= $string[random_int(0, $max_length-1)];
            $new_string['second'] .= $string[random_int(0, $max_length-1)];
        }
        return implode("-", $new_string);
    }

    public function insertCode(string $code): bool
    {
        if ($this->id > 0) {
            global $pdo;
            $stmt = $pdo->prepare("UPDATE {$this->table} SET code = ? WHERE id = ?;");
            return $stmt->execute([$code, $this->id]);
        } else {
            throw new \Exception("Id not defined");
        }
    }
    public function verifyCode(string $code):bool
    {
        if ($this->id > 0) {
            global $pdo;
            $stmt = $pdo->prepare("SELECT COUNT(*) as count_code FROM {$this->table} WHERE code = ? AND id != ?");
            $stmt->execute([$code, $this->id]);
            $table = $stmt->fetch(\PDO::FETCH_ASSOC);
            return (bool) $table['count_code'];
        } else {
            throw new \Exception("Id not defined");
        }
    }
}
