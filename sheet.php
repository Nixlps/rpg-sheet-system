<?php
  class Sheet {
    private $conn;

    public function __construct($connection) {
        $this->conn = $connection;
    }

    // Using prepared statments to avoid SQL Injection

    public function addCharacter($name, $class, $race, $level, $healthPoints, $manaPoints) {
        $stmt = $this->conn->prepare("INSERT INTO sheets (`name`, class, race, `level`, health_points, mana_points) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiis", $name, $class, $race, $level, $healthPoints, $manaPoints);
        $stmt->execute();
        $stmt->close();
    }

    public function getAllCharacters() {
        $result = $this->conn->query("SELECT * FROM sheets");
        return $result;
    }

    public function getCharacterById($id) {
        $stmt = $this->conn->prepare("SELECT * FROM sheets WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        return $result->fetch_assoc();
    }

    public function updateCharacter($id, $name, $class, $race, $level, $healthPoints, $manaPoints) {
        $stmt = $this->conn->prepare("UPDATE sheets SET `name`=?, class=?, race=?, `level`=?, health_points=?, mana_points=? WHERE id=?");
        $stmt->bind_param("sssiisi", $name, $class, $race, $level, $healthPoints, $manaPoints, $id);
        $stmt->execute();
        $stmt->close();
    }

    public function deleteCharacter($id) {
        $stmt = $this->conn->prepare("DELETE FROM sheets WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
    }
  }
?>