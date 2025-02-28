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
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Check required fields
    if (!isset($data['email']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Email and password are required']);
        exit;
    }

    $email = $data['email'];
    $password = $data['password'];

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

    // Prepare and execute query
    $stmt = $connection->prepare('SELECT content FROM app_data WHERE id = ?');
    $id = 1;
    $stmt->bind_param('i', $id);
    $stmt->execute();
    
    // Get result
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['message' => 'Configuration not found']);
        exit;
    }

    // Fetch and parse data
    $row = $result->fetch_assoc();
    $appData = json_decode($row['content'], true);
    
    // Check credentials
    if ($appData['logins']['username'] === $email && $appData['logins']['password'] === $password) {
        http_response_code(200);
        echo json_encode(['message' => 'Login successful']);
    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Invalid username or password']);
    }

} catch (Exception $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'message' => 'An error occurred during login',
        'error' => $e->getMessage()
    ]);
} finally {
    // Close statement and connection if they exist
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($connection)) {
        $connection->close();
    }
}
?>