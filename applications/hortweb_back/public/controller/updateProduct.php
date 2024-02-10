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

    if ($data && isset($data->prodId) && isset($data->prodName) && isset($data->prodPrice) && isset($data->prodDate) && isset($data->prodDesc)) 
    {
        if(isset($data->newImg) && isset($data->imgExtension))
        {
            $result = $crud->readByField('products', ['id'], [$data->prodId]);

            if($result)
            {
                unlink('../../../hortweb_front/public/assets/images/users/' . $result[0]['img']);
            }

            $img = str_replace('data:image/png;base64,', '', $data->newImg);
            $img = str_replace(' ', '+', $img);
            $decodedImg = base64_decode($img);

            $fileName = uniqid() . "." . $data->imgExtension;

            $uploadDir = '../../../hortweb_front/public/assets/images/products/';

            $filePath = $uploadDir . $fileName;

            file_put_contents($filePath, $decodedImg);

            updateInfo($crud, $data->prodId, $data->prodName, $data->prodPrice, $data->prodDate, $data->prodDesc, $fileName);
        }
        else
        {
            updateInfo($crud, $data->prodId, $data->prodName, $data->prodPrice, $data->prodDate, $data->prodDesc);
        }     
        
        
    }
}

function updateInfo($crud, $id, $nome, $price, $date, $desc, $imgPath = null)
{
    $result = null;

    if($imgPath == null)
    {
        $result = $crud->update('products', ['nome', 'descricao', 'preco', 'proddata'], [$nome, $desc, $price, $date], $id);
    }
    else
    {
        $result = $crud->update('products', ['nome', 'descricao', 'preco', 'proddata', 'img'], [$nome, $desc, $price, $date, $imgPath], $id);
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

