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

    if ($data && isset($data->id) && isset($data->email) && isset($data->nome) && isset($data->phone)) 
    {
        if(isset($data->newImg) && isset($data->imgExtension))
        {
            $result = $crud->readByField('users', ['id'], [$data->id]);

            if($result)
            {
                unlink('../../../hortweb_front/public/assets/images/users/' . $result[0]['img']);
            }

            $img = str_replace('data:image/png;base64,', '', $data->newImg);
            $img = str_replace(' ', '+', $img);
            $decodedImg = base64_decode($img);

            $fileName = uniqid() . "." . $data->imgExtension;

            $uploadDir = '../../../hortweb_front/public/assets/images/users/';

            $filePath = $uploadDir . $fileName;

            file_put_contents($filePath, $decodedImg);

            updateInfo($crud, $data->id, $data->email, $data->nome, $data->phone, $fileName);
        }
        else
        {
            updateInfo($crud, $data->id, $data->email, $data->nome, $data->phone);
        }     
        
        
    }
}

function updateInfo($crud, $id, $email, $nome, $phone, $imgPath = null)
{
    $result = null;

    if($imgPath == null)
    {
        $result = $crud->update('users', ['email', 'nome', 'telefone'], [$email, $nome, $phone], $id);
    }
    else
    {
        $result = $crud->update('users', ['email', 'nome', 'telefone', 'img'], [$email, $nome, $phone, $imgPath], $id);
    }

    if($result)
    {
        header('Content-Type: application/json');
        echo json_encode(['success' => 'Informações atualizadas com sucesso']);
    }
    else
    {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Erro ao atualizar informações']);
    }

}

