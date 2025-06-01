<?php
session_start();
require 'config.php';

// Verificar si es administrador
if ($_SESSION['type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Acceso no autorizado']);
    exit;
}

$stmt = $pdo->query('SELECT s.id, p.direccion, s.username, s.date 
                     FROM solicitudes s
                     JOIN propiedades p ON s.property_id = p.id');
$requests = $stmt->fetchAll();

echo json_encode($requests);
?>