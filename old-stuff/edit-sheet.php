<?php
include 'db-connection.php';
include 'sheet.php';

$connection = new Connection();
$characterSheet = new Sheet($connection);

// If ID doesn't exist or doesn't match in database, redirect to home 
if (isset($_GET['id'])) {
    $editId = $_GET['id'];
    $characterToEdit = $characterSheet->getCharacterById($editId);

    if (!$characterToEdit) {
        header("Location: index.php");
        exit();
    }
} else {
    header("Location: index.php");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['updateCharacter'])) {
    $name = $_POST['name'];
    $class = $_POST['class'];
    $race = $_POST['race'];
    $level = $_POST['level'];
    $healthPoints = $_POST['healthPoints'];
    $manaPoints = $_POST['manaPoints'];

    $characterSheet->updateCharacter($editId, $name, $class, $race, $level, $healthPoints, $manaPoints);
    
    // after update, redirect to home
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Personagem</title>
</head>
<body>

<h2>Editar personagem</h2>

<form action="edit.php?id=<?php echo $editId; ?>" method="post">
    <label for="name">Nome:</label>
    <input type="text" name="name" value="<?php echo $characterToEdit['name']; ?>" required>

    <label for="class">Classe:</label>
    <input type="text" name="class" value="<?php echo $characterToEdit['class']; ?>" required>

    <label for="race">Raça:</label>
    <input type="text" name="race" value="<?php echo $characterToEdit['race']; ?>" required>

    <label for="level">Level:</label>
    <input type="number" name="level" value="<?php echo $characterToEdit['level']; ?>" required>

    <label for="healthPoints">Vida:</label>
    <input type="number" name="healthPoints" value="<?php echo $characterToEdit['health_points']; ?>" required>

    <label for="manaPoints">Mana:</label>
    <input type="number" name="manaPoints" value="<?php echo $characterToEdit['mana_points']; ?>" required>

    <button type="submit" name="updateCharacter">Atualizar e salvar</button>
</form>

</body>
</html>