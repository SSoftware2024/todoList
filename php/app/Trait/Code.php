<?php

namespace ToDoList\App\Trait;

trait Code
{
    public function generate():string
    {
        $string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $max_length = strlen($string);
        $new_string = [
            'first' => 'XXX',
            'second' => 'XXX',
        ];

        for($i = 0; $i < strlen($new_string['first']); $i++){
            $new_string['first'] .= $string[random_int(0, $max_length)];
            $new_string['second'] .= $string[random_int(0, $max_length)];
        }
        return implode("-",$new_string);
    }
}
