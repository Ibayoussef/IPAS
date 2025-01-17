import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: "91.238.160.176" || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: "ipadvice_root",
  password: "heavenking1432",
  database: 'ipadvice_db'
};

export async function POST(request) {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection(dbConfig);
    
    const payload = await request.json();

    // Check if the row exists
    const [rows] = await connection.execute(
      'SELECT * FROM app_data WHERE id = ?',
      [1]
    );

    let result;
    if (rows.length === 0) {
      // Row doesn't exist, so insert
      const [insertResult] = await connection.execute(
        'INSERT INTO app_data (id, content) VALUES (?, ?)',
        [1, JSON.stringify(payload)]
      );
      
      // Fetch the inserted data
      const [insertedRows] = await connection.execute(
        'SELECT * FROM app_data WHERE id = ?',
        [1]
      );
      result = insertedRows[0];
    } else {
      // Row exists, so update
      const [updateResult] = await connection.execute(
        'UPDATE app_data SET content = ? WHERE id = ?',
        [JSON.stringify(payload), 1]
      );
      
      // Fetch the updated data
      const [updatedRows] = await connection.execute(
        'SELECT * FROM app_data WHERE id = ?',
        [1]
      );
      result = updatedRows[0];
    }

    return NextResponse.json(
      { message: "Data saved successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { message: "Error saving data", error: error.message },
      { status: 500 }
    );
  } finally {
    // Close the connection
    if (connection) {
      try {
        await connection.end();
      } catch (error) {
        console.error("Error closing connection:", error);
      }
    }
  }
}