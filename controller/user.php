<?php
  include '../model/database.php';
  include '../model/send-email.php';
  include './jwt.php';

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Credentials: true');

  $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
  $uri = explode('/', $uri);

  $action = $uri[4];

  $bearer_token = get_bearer_token();
  $is_jwt_valid = isset($bearer_token) ? is_jwt_valid($bearer_token) : false;

  $database = new Database();

  if ($action==='register') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    error_log('Dados do usuário após decodificação JSON: ' . print_r($_POST, true));
    
    $user = [
      'username' => $_POST['username'],
      'email' => $_POST['email'],
      'password' => md5($_POST['password']),
      'status' => 0,
      'created_date' => date('Y-m-d H:i:s'),
    ];

    if ($user_id = $database->register($user)) {
      $user['id'] = $user_id;
      if ($code = $database->generateConfirmCode($user_id)) {
        sendConfirmationCode($user['username'], $user['email'], $code);
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $user];
        $jwt = generate_jwt($headers, $payload);
        echo json_encode(['status' => $jwt]);
      } 

      else {
        echo json_encode(['error' => 'Erro ao gerar o código de confirmação']);
      }
    } 
    else {
      echo json_encode(['error' => 'Usuário já cadastrado']);
    }
  } elseif ($action === 'confirm') {
      if ($is_jwt_valid) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $user_id = getPayload($bearer_token)->user->id;

        if ($database->confirmCode($user_id, $_POST['code'])) {
          
          if ($database->activeUser($user_id)) {
            echo json_encode(['status' => 1]);
            exit();
          }

          else {
            echo json_encode(['status' => 0, 'error' => 'Falha ao confirmar o código']);
          }
        }
      }
  } elseif ($action === 'login') {
      $rest_json = file_get_contents('php://input');
      $_POST = json_decode($rest_json, true);

      $login = $_POST['login'];
      $password = md5($_POST['password']);

      $loginResult = $database->loginUser($login, $password);

      if ($loginResult === 'USER_NOT_FOUND') {
          echo json_encode(['status' => 0, 'error' => 'Usuário não encontrado']);
      } elseif ($loginResult === 'INVALID_PASSWORD') {
          echo json_encode(['status' => 0, 'error' => 'Senha inválida']);
      } elseif ($loginResult !== false) {
          if ($loginResult['status'] === 0) {
            echo json_encode(['status' => 0, 'error' => 'Conta não verificada. Entre no seu email para confirmar.']);
          } 
          else {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $loginResult];
            $jwt = generate_jwt($headers, $payload);
            echo json_encode(['status' => $jwt]);
          }
      } 
      else {
        echo json_encode(['status' => 0, 'error' => 'Falha ao autenticar o login']);
      }
  } elseif ($action === 'user') {
      if ($is_jwt_valid) {
        $username = getPayload($bearer_token)->user->username;
        
        if ($user = $database->getUserByUsernameOrEmail($username)) {
          echo json_encode(['status' => $user]);
        }
        
        else {
          echo json_encode(['status' => 0, 'error' => 'Falha ao buscar o usuário correspondente ao username ou email fornecido']);
        }
      }
  } elseif ($action === 'reset') {
      $rest_json = file_get_contents('php://input');
      $_POST = json_decode($rest_json, true);

      if ($user = $database->getUserByUsernameOrEmail($_POST['email'])) {
        $reset_token = bin2hex(random_bytes(32));
        $expiration_time = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        if ($database->newPasswordToken($user['id'], $reset_token, $expiration_time)) {
          sendResetLink($user['username'], $user['email'], $reset_token);
          echo json_encode(['status' => 1]);
        } 
        
        else {
          echo json_encode(['status' => 0, 'error' => 'Falha ao gerar o novo token de reset de senha']);
        }
      }
  } elseif ($action === 'new-password') {
      $rest_json = file_get_contents('php://input');
      $_POST = json_decode($rest_json, true);

      if ($user_reset = $database->getUserByResetToken($_POST['token'])) {
        $user_id = $user_reset['user_id'];
        if ($user = $database->updatePassword($user_id, $_POST['new_password'])) {
          echo json_encode(['status' => 1]);
        } 
        
        else {
          echo json_encode(['status' => 0, 'error' => 'Falha ao atualizar a senha']);
        }
      }
  } 
  // elseif ($action === 'new-code'){
  //     $rest_json = file_get_contents('php://input');
  //     $_POST = json_decode($rest_json, true);

  //     if($user = $database->getUserByUsernameOrEmail($_POST['email'])){
  //       if ($code = $database->generateConfirmCode($user['id'])) {
  //         sendConfirmationCode($user['username'], $user['email'], $code);
  //         $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
  //         $payload = ['user' => $user];
  //         $jwt = generate_jwt($headers, $payload);
  //         echo json_encode(['status' => $jwt]);
  //       } else {
  //         echo json_encode(['error' => 'Erro ao gerar o código de confirmação']);
  //       }
  //     }
  // }
?>