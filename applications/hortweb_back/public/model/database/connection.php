<?php
$host = "postgres";
$user = "postgres";
$password = "postgres_pass";
$dbname = "db_hortweb";
$port = "5432";

try {
    $connection = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
    exit;
}
