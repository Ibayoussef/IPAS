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

// File storage configuration
$uploadDir = dirname(__FILE__) . '/../public/images/';
$publicUrlBase = '/images/';

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Check if file was uploaded
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'message' => 'No file uploaded or upload error: ' . ($_FILES['file']['error'] ?? 'No file sent')
        ]);
        exit;
    }

    // Get the name parameter
    $name = $_POST['name'] ?? 'file';

    // Create upload directory if it doesn't exist
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            throw new Exception("Failed to create upload directory");
        }
    }

    // Get file info and generate paths
    $fileExtension = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    $timestamp = time();
    $uniqueFilename = "{$name}-{$timestamp}.{$fileExtension}";
    $filePath = $uploadDir . $uniqueFilename;
    $fileUrl = $publicUrlBase . $uniqueFilename;
    
    // Save file to filesystem
    if (!move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        throw new Exception("Failed to move uploaded file");
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

    // Save file information to database
    $stmt = $connection->prepare(
        'INSERT INTO file_uploads (filename, original_name, file_path, file_url, content_type) VALUES (?, ?, ?, ?, ?)'
    );
    
    $originalName = $_FILES['file']['name'];
    $contentType = $_FILES['file']['type'];
    
    $stmt->bind_param('sssss', $uniqueFilename, $originalName, $filePath, $fileUrl, $contentType);
    $stmt->execute();
    
    $fileId = $connection->insert_id;
    $stmt->close();

    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'url' => $fileUrl,
        'fileId' => $fileId
    ]);

} catch (Exception $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save file',
        'error' => $e->getMessage()
    ]);
} finally {
    // Close the connection if it exists
    if (isset($connection)) {
        $connection->close();
    }
}
?>