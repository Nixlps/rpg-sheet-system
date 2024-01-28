<?php
  include '../model/login-db.php';
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

  if($action==='register'){
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
      error_log('Usuário registrado com ID: ' . $user_id);
      $user['id'] = $user_id;
      if ($code = $database->generateConfirmCode($user_id)) {
          // send generated code by email to user
          $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
          $payload = ['user' => $user];
          $jwt = generate_jwt($headers, $payload);
          echo json_encode(['status' => $jwt]);
      } else {
          error_log('Erro na geração do código de confirmação');
          echo json_encode(['error' => 'Erro na geração do código de confirmação']);
      }
    } else {
        error_log('Erro no registro do usuário');
        echo json_encode(['error' => 'Erro no registro do usuário']);
    }
  }
?>