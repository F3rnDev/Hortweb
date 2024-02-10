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

    if ($data && isset($data->userId) && isset($data->prodId)) 
    {
        $getInterestId = $crud->readByField('interests', ['userid', 'prodid'], [$data->userId, $data->prodId]);

        if ($getInterestId) 
        {
            $result = $crud->delete('interests', 'id', $getInterestId[0]['id']);

            if($result)
            {
                header('Content-Type: application/json');
                echo json_encode(['success' => 'Interesse deletado com sucesso']);
            }
            else
            {
                header('Content-Type: application/json');
                echo json_encode(['error' => 'Erro ao deletar interesse']);
            }
        }
        else
        {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Erro ao deletar interesse']);
        }
    }

}