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

// Check if request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    exit;
}

try {
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
    $stmt = $connection->prepare('SELECT * FROM app_data WHERE id = ?');
    $id = 1;
    $stmt->bind_param('i', $id);
    $stmt->execute();
    
    // Get result
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['message' => 'Data not found']);
        exit;
    }

    // Fetch data
    $data = $result->fetch_assoc();
    
    // Parse JSON content if it's stored as a string
    if (is_string($data['content'])) {
        $data['content'] = json_decode($data['content'], true);
    }

    // Return success response
    http_response_code(200);
    echo json_encode([
        'message' => 'Data fetched successfully',
        'data' => $data
    ]);

} catch (Exception $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'message' => 'Error fetching data',
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