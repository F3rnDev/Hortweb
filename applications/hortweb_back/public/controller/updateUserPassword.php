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

    if ($data && isset($data->id) && isset($data->password) && isset($data->newPassword))
    {
        $result = $crud->readByField('users', ['id'], [$data->id]);

        if($result && checkUserPassword($result, $data->password, $data->newPassword))
        {
            updatePassword($crud, $data->id, $data->newPassword);
        }
    }

}

function updatePassword($crud, $id, $newPassword)
{
    $result = $crud->update('users', ['senha'], [$newPassword], $id);

    if($result)
    {
        header('Content-Type: application/json');
        echo json_encode(['success' => 'Senha alterada com sucesso']);
    }
    else
    {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Erro ao alterar senha']);
    }
}

function checkUserPassword($result, $password, $newPassword)
{
    if($result[0]["senha"] != $password)
    {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Senha atual incorreta']);
        return false;
    }

    if($result[0]["senha"] == $newPassword)
    {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'A nova senha não pode ser igual a senha atual']);
        return false;
    }

    return true;
}