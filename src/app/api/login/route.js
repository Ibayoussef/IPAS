import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

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
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      'SELECT content FROM app_data WHERE id = ?',
      [1]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Configuration not found" },
        { status: 401 }
      );
    }

    const data = JSON.parse(rows[0].content);
    
    if (data.logins.username === email && data.logins.password === password) {
      return NextResponse.json({
        message: "Login successful"
      });
    }

    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
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