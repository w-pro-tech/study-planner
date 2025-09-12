<?php
session_start();
header('Content-Type: application/json');

require_once '../config/database.php';

// Recebe dados via POST
$input = json_decode(file_get_contents('php://input'), true);
$nome = $input['nome'] ?? '';
$email = $input['email'] ?? '';
$senha = $input['senha'] ?? '';

// Validação básica
if (empty($email) || empty($senha)) {
    echo json_encode(["erro" => true, "mensagem" => "Email e senha são obrigatórios"]);
    exit();
}

try {
    $db = new Database();
    $conn = $db->connect();
    
    // Busca usuário por email
    $sql = "SELECT id, nome, email, senha FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        
        // Verifica senha
        if (password_verify($senha, $usuario['senha'])) {
            // Login bem-sucedido
            $_SESSION['user_id'] = $usuario['id'];
            $_SESSION['user_nome'] = $usuario['nome'];
            $_SESSION['user_email'] = $usuario['email'];
            
            echo json_encode([
                "erro" => false, 
                "mensagem" => "Login realizado com sucesso!",
                "redirect" => "../dashboard/main.php"
            ]);
        } else {
            echo json_encode(["erro" => true, "mensagem" => "Senha incorreta"]);
        }
    } else {
        echo json_encode(["erro" => true, "mensagem" => "Usuário não encontrado"]);
    }
    
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(["erro" => true, "mensagem" => "Erro interno do servidor"]);
}
