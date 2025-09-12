<?php
session_start();

// Se usuário já está logado, vai para dashboard
if (isset($_SESSION['user_id'])) {
    header('Location: dashboard/main.php');
    exit();
}

// Se não está logado, vai para login
header('Location: auth/login.php');
exit();


