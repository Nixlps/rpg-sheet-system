<?php
  class Database{
    private $host = "localhost";
    private $username = "root";
    private $password = "volume22";
    private $dbname = "rpg-sheet-system";
    private $connection = null;

    // receives the user’s profile and stores it in the database
    public function register($user){
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
      $this->connection->set_charset('utf8');
      
      $sql = $this->connection->prepare( 'INSERT INTO user (`username`, `email`, `password`, `status`, `created_date`) VALUES (?,?,?,?,?)' );
      $sql->bind_param( 'sssis', $user['username'], $user['email'], $user['password'], $user['status'], $user['created_date'] );
      
      if($sql->execute()){ 
        $id = $this->connection->insert_id; 
        $sql->close(); 
        $this->connection->close(); 
        return $id; 
      }else {
        error_log('Erro na execução do SQL: ' . $sql->error);
      }
      
      $sql->close();
      $this->connection->close();
      return false;
    }

    // creates a 5-digit confirmation code and stores it in the “account_confirm” table
    public function generateConfirmCode($user_id){
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
      $this->connection->set_charset('utf8');

      $sql = $this->connection->prepare( 'INSERT INTO `account_confirm`(`user_id`, `code`) VALUES(?, ?) ON DUPLICATE KEY UPDATE code=?' );
      $code = rand(11111, 99999);
      $sql->bind_param('iii', $user_id, $code, $code);
      
      if($sql->execute()){
        $sql->close();
        $this->connection->close();
        return $code;
      }

      $sql->close();
      $this->connection->close();
      return false;
    }

    // receives the user id and the code entered by the user and retrieves its record, returning true if there is a record (which means the entered code is correct) and false otherwise
    public function confirmCode($user_id, $code){
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
      $this->connection->set_charset('utf8');

      $sql = $this->connection->prepare( 'SELECT * FROM `account_confirm` WHERE user_id=? AND code=?' );
      $sql->bind_param('is', $user_id, $code);
      $sql->execute();
      $result = $sql->get_result();

      if($result->num_rows > 0){
        $sql->close();
        $this->connection->close();
        return true;
      }

      $sql->close();
      $this->connection->close();
      return false;
    }

    // change user account from inactive to active after the account is confirmed
    public function activeUser($user_id){
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
      $this->connection->set_charset('utf8');

      $sql = $this->connection->prepare( 'UPDATE `user` SET `status` = 1 WHERE id=?' );
      $sql->bind_param('i', $user_id);
      
      if($sql->execute()){
        $sql->close();
        $this->connection->close();
        return true;
      }

      $sql->close();
      $this->connection->close();
      return false;
    }

    // receives the username and password and returns the desired user
    public function loginUser($username, $password){
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
      $this->connection->set_charset('utf8');
      
      $sql = $this->connection->prepare( 'SELECT * FROM `user` WHERE username=? AND password=?' );
      $sql->bind_param('ss', $username, $password);
      $sql->execute();
      $result = $sql->get_result();
      
      if($result->num_rows > 0){
        $user = $result->fetch_assoc();
        $sql->close();
        $this->connection->close();
        return $user;
      }

      $sql->close();
      $this->connection->close();
      return false;
    }

    // receives the username or email and returns the desired user
    public function getUserByUsernameOrEmail($username, $email){
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
      $this->connection->set_charset('utf8');
      
      $sql = $this->connection->prepare( 'SELECT DISTINCT * FROM `user` WHERE username=? OR email=?' );
      $sql->bind_param('ss', $username, $email);
      $sql->execute();
      $result = $sql->get_result();
      
      if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $sql->close();
        $this->connection->close();
        return $user;
      }
      
      $sql->close();
      $this->connection->close();
      return false;
    }

    // is responsible for updating the user profile
    public function updateUser($user){
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
      $this->connection->set_charset('utf8');
      
      $sql = $this->connection->prepare( 'UPDATE `user` SET `username`=?,`email`=?,`password`=? WHERE id=?' );
      $sql->bind_param( 'sssi', $user['username'], $user['email'], $user['password']);
      
      if($sql->execute()){
        $sql->close();
        $this->connection->close();
        return true;
      }

      $sql->close();
      $this->connection->close();
      return false;
    }
  }
?>