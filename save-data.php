<?php
// Set headers for JSON response
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Cache preflight response for 1 hour
    header('Access-Control-Max-Age: 3600');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit(0);
}

// Database configuration
$dbConfig = [
    'host' => '91.238.160.176',
    'port' => 3306,
    'user' => 'ipadvice_root',
    'password' => 'heavenking1432',
    'database' => 'ipadvice_db'
];

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

try {
    // Get JSON payload
    $json = file_get_contents('php://input');
    $payload = json_decode($json, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON payload: " . json_last_error_msg());
    }

    // Create database connection
    $connection = new mysqli(
        $dbConfig['host'],
        $dbConfig['user'],
        $dbConfig['password'],
        $dbConfig['database'],
        $dbConfig['port']
    );

    // Check connection
    if ($connection->connect_error) {
        throw new Exception("Connection failed: " . $connection->connect_error);
    }

    // Check if the row exists
    $stmt = $connection->prepare('SELECT * FROM app_data WHERE id = ?');
    $id = 1;
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    // Prepare JSON payload for database
    $jsonData = json_encode($payload);
    
    if ($result->num_rows === 0) {
        // Row doesn't exist, so insert
        $insertStmt = $connection->prepare('INSERT INTO app_data (id, content) VALUES (?, ?)');
        $insertStmt->bind_param('is', $id, $jsonData);
        $insertStmt->execute();
        $insertStmt->close();
        
        // Fetch the inserted data
        $fetchStmt = $connection->prepare('SELECT * FROM app_data WHERE id = ?');
        $fetchStmt->bind_param('i', $id);
        $fetchStmt->execute();
        $result = $fetchStmt->get_result();
        $data = $result->fetch_assoc();
        $fetchStmt->close();
    } else {
        // Row exists, so update
        $updateStmt = $connection->prepare('UPDATE app_data SET content = ? WHERE id = ?');
        $updateStmt->bind_param('si', $jsonData, $id);
        $updateStmt->execute();
        $updateStmt->close();
        
        // Fetch the updated data
        $fetchStmt = $connection->prepare('SELECT * FROM app_data WHERE id = ?');
        $fetchStmt->bind_param('i', $id);
        $fetchStmt->execute();
        $result = $fetchStmt->get_result();
        $data = $result->fetch_assoc();
        $fetchStmt->close();
    }

    // Process data for output
    if (is_string($data['content'])) {
        $data['content'] = json_decode($data['content'], true);
    }

    // Return success response
    http_response_code(200);
    echo json_encode([
        'message' => 'Data saved successfully',
        'data' => $data
    ]);

} catch (Exception $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'message' => 'Error saving data',
        'error' => $e->getMessage()
    ]);
} finally {
    // Close the connection if it exists
    if (isset($connection)) {
        $connection->close();
    }
}
?>