<?php
session_start();
require 'config.php';

// Verificar si es administrador
if ($_SESSION['type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Acceso no autorizado']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$direccion = $data['direccion'];
$tipo = $data['tipo'];
$habitaciones = $data['habitaciones'];
$superficie = $data['superficie'];
$precio = $data['precio'];
$imagen_url = $data['imagen_url'];

$stmt = $pdo->prepare('INSERT INTO propiedades (direccion, tipo, habitaciones, superficie, precio, imagen_url) VALUES (?, ?, ?, ?, ?, ?)');
if ($stmt->execute([$direccion, $tipo, $habitaciones, $superficie, $precio, $imagen_url])) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>