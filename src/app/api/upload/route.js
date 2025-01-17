import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import path from 'path';
import fs from 'fs/promises';

// Database configuration
const dbConfig = {
  host: "91.238.160.176" || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: "ipadvice_root",
  password: "heavenking1432",
  database: 'ipadvice_db'
};

// File storage configuration
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images');
const PUBLIC_URL_BASE = '/images/';

export async function POST(request) {
  let connection;
  
  try {
    const data = await request.formData();
    const file = data.get("file");
    const name = data.get("name");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Create upload directory if it doesn't exist
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Get file info and generate paths
    const fileExtension = file.name.split(".").pop();
    const timestamp = Date.now();
    const uniqueFilename = `${name}-${timestamp}.${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFilename);
    const fileUrl = `${PUBLIC_URL_BASE}${uniqueFilename}`;
    
    // Save file to filesystem
    await fs.writeFile(filePath, fileBuffer);

    // Create database connection
    connection = await mysql.createConnection(dbConfig);

    // Save file information to database with matching schema
    const [result] = await connection.execute(
      'INSERT INTO file_uploads (filename, original_name, file_path, file_url, content_type) VALUES (?, ?, ?, ?, ?)',
      [uniqueFilename, file.name, filePath, fileUrl, file.type]
    );

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      fileId: result.insertId
    });

  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save file", error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (error) {
        console.error("Error closing connection:", error);
      }
    }
  }
}