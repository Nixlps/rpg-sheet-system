<?php 
  require '../vendor/autoload.php';

  function sendConfirmationEmail($email, $code) {
    error_log('Email e código: ' . $email . $code);
    $apiKey = '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';
    $sendgrid = new \SendGrid($apiKey);

    $email = new \SendGrid\Mail\Mail();
    $email->setFrom("no-reply@rpgsheetsys.com", "Nix");
    $email->setSubject("Confirmação de Cadastro");
    $email->addTo($email);
    $email->addContent("text/plain", "Obrigado por se cadastrar! Seu código de confirmação é: $code");

    try {
        $response = $sendgrid->send($email);
        if ($response->statusCode() == 202) {
            echo "E-mail enviado com sucesso!";
        } else {
            echo "Erro ao enviar o e-mail: " . $response->body();
        }
    } catch (Exception $e) {
        echo "Erro ao enviar o e-mail: " . $e->getMessage();
    }
  }
?>
