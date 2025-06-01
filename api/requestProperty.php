<?php
session_start();
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$propertyId = $data['propertyId'];
$username = $_SESSION['username'];

// Verificar si la propiedad existe
$stmt = $pdo->prepare('SELECT * FROM propiedades WHERE id = ?');
$stmt->execute([$propertyId]);
$property = $stmt->fetch();

if (!$property) {
    echo json_encode(['success' => false, 'message' => 'Propiedad no encontrada']);
    exit;
}

// Insertar solicitud
$stmt = $pdo->prepare('INSERT INTO solicitudes (property_id, username) VALUES (?, ?)');
if ($stmt->execute([$propertyId, $username])) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>