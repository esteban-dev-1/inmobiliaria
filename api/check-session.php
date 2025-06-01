<?php
session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'loggedIn' => true,
        'userData' => [
            'id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'type' => $_SESSION['type']
        ]
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>