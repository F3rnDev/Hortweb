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

    if ($data && isset($data->id) && isset($data->prodId)) 
    {
        $result = $crud->readByField('interests', ['userid', 'prodid'], [$data->id, $data->prodId]);

        if(!$result)
        {
            $crud->create('interests', ['userid', 'prodid'], [$data->id, $data->prodId]);
            header('Content-Type: application/json');
            echo json_encode(['success' => 'Produto adicionado à lista de interesse']);
        }
        else
        {
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Produto já adicionado à lista de interesse']);
        }
    }
}