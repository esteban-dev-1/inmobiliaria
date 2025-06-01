<?php
session_start();
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

$stmt = $pdo->prepare('SELECT * FROM usuarios WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['type'] = $user['type'];
    
    // CORRECCIÓN IMPORTANTE: Enviar id además de type
    echo json_encode([
        'success' => true,
        'userData' => [
            'id' => $user['id'],   // <-- Añadir esta línea
            'type' => $user['type']
        ]
    ]);
} else {
    echo json_encode(['success' => false]);
}
?>