<?php

class Crud
{
    private $connection;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function create($table, array $fields, array $values)
    {
        try {
            $query = "INSERT INTO $table (" . $this->addValuesToQuery($fields, "create") . "VALUES (" . $this->addValuesToQuery($fields, "create", ":");
            $stmt = $this->connection->prepare($query);

            for ($curr = 0; $curr < count($values); $curr++) {
                $stmt->bindParam(':' . $fields[$curr], $values[$curr]);
            }

            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            return false;
        }
    }

    public function createAndReturnId($table, array $fields, array $values)
    {
        try {
            $query = "INSERT INTO $table (" . $this->addValuesToQuery($fields, "create") . "VALUES (" . $this->addValuesToQuery($fields, "create", ":")." RETURNING id";
            $stmt = $this->connection->prepare($query);

            for ($curr = 0; $curr < count($values); $curr++) {
                $stmt->bindParam(':' . $fields[$curr], $values[$curr]);
            }

            return [$stmt->execute(), $stmt->fetch(PDO::FETCH_ASSOC)['id']];
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            return false;
        }
    }

    public function delete($table, $field, $id)
    {
        try {
            $query = "DELETE FROM $table WHERE $field = :$field";
            $stmt = $this->connection->prepare($query);
            $stmt->bindParam(":$field", $id);
            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            return false;
        }
    }

    public function update($table, array $fields, array $values, $id)
    {
        try {
            $query = "UPDATE $table SET ".$this->addValuesToQuery($fields, "update", ":") ." WHERE id = :id";
            $stmt = $this->connection->prepare($query);
            $stmt->bindParam(':id', $id);

            for ($curr = 0; $curr < count($values); $curr++) {
                $stmt->bindParam(':' . $fields[$curr], $values[$curr]);
            }

            return $stmt->execute();
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            return false;
        }
    }

    public function read($table)
    {
        try {
            $query = "SELECT * FROM $table";
            $stmt = $this->connection->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            var_dump($e->getMessage());
            return false;
        }
    }

    public function readByID($table, $id)
    {
        try {
            $query = "SELECT * FROM $table WHERE id=:id";
            $stmt = $this->connection->prepare($query);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            var_dump($e->getMessage());
            return false;
        }
    }

    public function readByField($table, array $fields, array $values)
    {
        try {
            $query = "SELECT * FROM $table WHERE ". $this->addValuesToQuery($fields, "read", ":");
            $stmt = $this->connection->prepare($query);

            for ($curr = 0; $curr < count($values); $curr++) {
                $stmt->bindParam(':' . $fields[$curr], $values[$curr]);
            }
            
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            var_dump($e->getMessage());
            return false;
        }
    }

    public function readByFieldMultiple($table, array $fields, array $values)
    {
        try {
            $query = "SELECT * FROM $table WHERE ". $this->addValuesToQuery($fields, "readMultiple", ":");
            $stmt = $this->connection->prepare($query);

            for ($curr = 0; $curr < count($values); $curr++) {
                $stmt->bindParam(':' . $fields[$curr], $values[$curr]);
            }
            
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            var_dump($e->getMessage());
            return false;
        }
    }

    public function readByFieldInsensitive($table, $field, $value)
    {
        try {
            $query = "SELECT * FROM $table WHERE $field ILIKE :value";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':value', "%$value%", PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erro ao executar query: " . $e->getMessage();
            var_dump($e->getMessage());
            return false;
        }
    }

    private function addValuesToQuery(array $keys, $action, $extra = "")
    {
        $valueToAdd = "";
        $keyLength = count($keys);

        if($action === "create")
        {
            for ($curr = 0; $curr < $keyLength; $curr++) {
                $valueToAdd .= $extra . $keys[$curr];
                if ($curr === $keyLength - 1) {
                    $valueToAdd .= ") ";
                } else {
                    $valueToAdd .= ",";
                }
            }
        }
        else if($action === "update")
        {
            for ($curr = 0; $curr < $keyLength; $curr++) 
            {   
                $valueToAdd .= $keys[$curr] . " = " . $extra . $keys[$curr];
                if ($curr !== $keyLength - 1) {
                    $valueToAdd .= ",";
                }
            }
        }
        else if($action === "read")
        {
            for ($curr = 0; $curr < $keyLength; $curr++) 
            {   
                $valueToAdd .= $keys[$curr] . " = " . $extra . $keys[$curr];
                if ($curr !== $keyLength - 1) {
                    $valueToAdd .= " AND ";
                }
            }
        }
        else
        {
            for ($curr = 0; $curr < $keyLength; $curr++) 
            {   
                $valueToAdd .= $keys[$curr] . " = " . $extra . $keys[$curr];
                if ($curr !== $keyLength - 1) {
                    $valueToAdd .= " OR ";
                }
            }
        }
        

        return $valueToAdd;
    }
}
