<?php
  class Connection{
    private $host = "localhost";
    private $username = "root";
    private $password = "volume22";
    private $dbname = "rpg_character_sheet";
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Erro ao conectar: " . $this->conn->connect_error);
        }
    }

    public function closeConnection() {
        $this->conn->close();
    }
  }
?>