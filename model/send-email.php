<?php 
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require '../vendor/phpmailer/phpmailer/src/Exception.php';
  require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
  require '../vendor/phpmailer/phpmailer/src/SMTP.php';

  function sendConfirmationCode($username, $email_receiver, $code){
    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'nix.loar@gmail.com';
    $mail->Password = 'vebdoosligpwifrh';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    $mail->setFrom('nix.loar@gmail.com');

    $mail->addAddress($email_receiver);

    $mail->isHTML(true);

    $mail->CharSet = 'UTF-8';

    $confirmation_link = 'http://localhost:8080/confirmacao';

    $mail->Subject = 'Confirmação de Cadastro RPG Sheet System';
    'Olá,<br><br>Este é o corpo do e-mail.<br><br>Atenciosamente,<br>Seu Nome';
    $mail->Body = 'Olá, ' . $username . '!' . '<br><br>Obrigada por se cadastrar. Seu código de confirmação é: ' . $code . '<br><br>Para confirmar sua conta, <a href=`' . $confirmation_link .'` target=_blank > clique aqui </a>';

    $mail->send();
  }
?>
