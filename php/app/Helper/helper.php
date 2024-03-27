<?php

if (!function_exists('getData')) {
    /**
     * Undocumented function
     *
     * @param string $message
     * @param string $status //success,info,warning,error
     * @param integer $code
     * @return array
     */
    function getData($message = '', $status = 'error', $code = null):array
    {
        $code = empty($code) ? http_response_code():$code;
        return [
            "message" => $message,
            'status' => $status,
            "code" => $code
        ];
    }
}
