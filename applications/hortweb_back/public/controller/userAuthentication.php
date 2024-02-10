<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range");
header("Access-Control-Expose-Headers: Content-Length,Content-Range");

require '../model/database/connection.php';
require '../model/dbManager.php';

$crud = new Crud($connection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data);

    if ($data && isset($data->email) && isset($data->password)) 
    {
        $email = $data->email;
        $password = $data->password;
    
        $result = $crud->readByField('users', ['email', 'senha'], [$email, $password]);
    
        if ($result) {

            $token = setToken($crud, $result[0]['id']);

            header('Content-Type: application/json');
            echo json_encode(['token' => $token]);
        } else {
            // Se as credenciais não correspondem a um registro, retorne uma resposta JSON com erro
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Credenciais inválidas']);
        }
    }
}

function setToken($crud, $userId)
{
    $generatedToken = bin2hex(random_bytes(16));
    
    $result = $crud->readByField('auth_session', ['userid'], [$userId]);

    if($result)
    {
        $crud->update('auth_session', ['sessiontoken'], [$generatedToken], $result[0]['id']);   
    }
    else
    {
        $crud->create('auth_session', ['userid', 'sessiontoken'], [$userId, $generatedToken]);
    }

    return $generatedToken;
}
