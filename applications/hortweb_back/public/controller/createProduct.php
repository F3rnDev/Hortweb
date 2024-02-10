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

    if ($data && isset($data->producerId) && isset($data->prodName) && isset($data->prodPrice) && isset($data->prodDate) && isset($data->prodDesc)) 
    {
        $fileName = null;

        if(isset($data->newImg) && isset($data->imgExtension))
        {
            $img = str_replace('data:image/png;base64,', '', $data->newImg);
            $img = str_replace(' ', '+', $img);
            $decodedImg = base64_decode($img);

            $fileName = uniqid() . "." . $data->imgExtension;

            $uploadDir = '../../../hortweb_front/public/assets/images/products/';

            $filePath = $uploadDir . $fileName;

            file_put_contents($filePath, $decodedImg);
        }

        createUser($crud, $data->prodName, $data->prodDesc, $data->prodPrice, $data->prodDate, $fileName, $data->producerId);
    }
}

function createUser($crud, $name, $desc, $price, $date, $img, $producer)
{
    $result = $crud->create('products', ['nome', 'descricao', 'preco', 'proddata', 'img', 'idProdutor'], [$name, $desc, $price, $date, $img, $producer]);

    if ($result) 
    {
        header('Content-Type: application/json');
        echo json_encode(['success' => 'Produto criado com sucesso!']);
    } 
    else 
    {
        header('Content-Type: application/json');
        echo json_encode(['error' => "Erro ao criar produto!"]);
    }
}