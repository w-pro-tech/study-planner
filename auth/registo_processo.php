<?php
header('Content-Type: application/json');

require_once '../config/database.php';

// Recebe dados via POST
$input = json_decode(file_get_contents('php://input'), true);
$nome = $input['nome'] ?? '';
$email = $input['email'] ?? '';
$senha = $input['senha'] ?? '';

// Validação básica
if (empty($nome) || empty($email) || empty($senha)) {
    echo json_encode(["erro" => true, "mensagem" => "Todos os campos são obrigatórios"]);
    exit();
}

if (strlen($senha) < 6) {
    echo json_encode(["erro" => true, "mensagem" => "Senha deve ter pelo menos 6 caracteres"]);
    exit();
}

try {
    $db = new Database();
    $conn = $db->connect();
    
    // Verifica se email já existe
    $sqlCheck = "SELECT id FROM users WHERE email = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("s", $email);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();
    
    if ($resultCheck->num_rows > 0) {
        echo json_encode(["erro" => true, "mensagem" => "Este email já está cadastrado"]);
        exit();
    }
    
    // Hash da senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    
    // Insere novo usuário
    $sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $nome, $email, $senhaHash);
    
    if ($stmt->execute()) {
        echo json_encode([
            "erro" => false, 
            "mensagem" => "Usuário cadastrado com sucesso!",
            "redirect" => "login.php"
        ]);
    } else {
        echo json_encode(["erro" => true, "mensagem" => "Erro ao cadastrar usuário"]);
    }
    
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(["erro" => true, "mensagem" => "Erro interno do servidor"]);
}
