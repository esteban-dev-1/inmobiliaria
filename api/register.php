<?php
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$type = $data['type'];

// Verificar si el usuario ya existe
$stmt = $pdo->prepare('SELECT * FROM usuarios WHERE username = ?');
$stmt->execute([$username]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => false, 'message' => 'El usuario ya existe']);
    exit;
}

// Crear nuevo usuario
$stmt = $pdo->prepare('INSERT INTO usuarios (username, password, type) VALUES (?, ?, ?)');
if ($stmt->execute([$username, $password, $type])) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>