<?php
  $host = "localhost";
  $username = "root";
  $password = "volume22";
  $dbname = "rpg-sheet-system";

  // Conectar ao banco de dados
  $conn = new mysqli($host, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

echo "Conexão bem-sucedida!";

// Realizar uma consulta simples
$sql = "SELECT * FROM user LIMIT 5";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<br>Dados da consulta:<br>";
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " - Nome: " . $row["username"] . "<br>";
    }
} else {
    echo "<br>Nenhum resultado encontrado.";
}

// Fechar a conexão
$conn->close();
?>