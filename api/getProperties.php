<?php
require 'config.php';

$stmt = $pdo->query('SELECT * FROM propiedades');
$properties = $stmt->fetchAll();

echo json_encode($properties);
?>