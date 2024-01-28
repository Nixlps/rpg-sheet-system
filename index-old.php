<?php
  include 'db-connection.php';
  include 'sheet.php';

  // $connection = new Connection();
  $characterSheet = new Sheet($connection);

  if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['addCharacter'])) {
    $name = $_POST['name'];
    $class = $_POST['class'];
    $race = $_POST['race'];

    // A character should always begins level 1, right?
    $level = 1;

    // In this prototype we'll use a random number between 10 and 100 for both LP and MP
    // A real case tho should have a logic calculating it according to class and race
    $healthPoints = rand(10, 100);
    $manaPoints = rand(10, 100);

    $characterSheet->addCharacter($name, $class, $race, $level, $healthPoints, $manaPoints);
  }

  $characters = $characterSheet->getAllCharacters();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Ficha de personagens de RPG</title>
</head>
<body>

  <div class="container new-character">
    <h2>Adicionar nova ficha</h2>
    
    <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post">
      <label for="name">Nome:</label>
      <input type="text" name="name" required>

      <label for="class">Classe</label>
        <select name="class" required>
          <option value="Guerreiro">Guerreiro</option>
          <option value="Paladino">Paladino</option>
          <option value="Ladino">Ladino</option>
          <option value="Arqueiro">Arqueiro</option>
          <option value="Mago">Mago</option>
          <option value="Necromante">Necromante</option>
        </select>

        <label for="race">Raça</label>
        <select name="race" required>
          <option value="Humano">Humano</option>
          <option value="Anão">Anão</option>
          <option value="Elfo">Elfo</option>
          <option value="Orc">Orc</option>
          <option value="Halfling">Mago</option>
        </select>
      <button type="submit" name="addCharacter">Adicionar personagem</button>
    </form>
  </div>

  <div class="container all-characters">
    <h2>Fichas Cadastradas</h2>
    
    <?php
      if ($characters->num_rows > 0) {
        echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Classe</th>
                <th>Raça</th>
                <th>Level</th>
                <th>Vida</th>
                <th>Mana</th>
            </tr>";
    
        while ($row = $characters->fetch_assoc()) {
          echo "<tr>
                  <td>{$row['id']}</td>
                  <td>{$row['name']}</td>
                  <td>{$row['class']}</td>
                  <td>{$row['race']}</td>
                  <td>{$row['level']}</td>
                  <td>{$row['health_points']}</td>
                  <td>{$row['mana_points']}</td>
                  <td>
                      <a href='edit-sheet.php?id={$row['id']}'>Edit</a> |
        
                      <form action='index.php' method='post'>
                          <input type='hidden' name='deleteId' value='{$row['id']}'>
                          <button type='submit' name='deleteCharacter'>Delete</button>
                      </form>
                  </td>
                </tr>";
            }
      
          echo "</table>";
      } else {
          echo "Nenhum personagem encontrado :(";
      }
      
      $connection->closeConnection();
    ?>
  </div>
</body>
</html>