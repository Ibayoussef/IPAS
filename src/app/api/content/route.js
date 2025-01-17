import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

const dbConfig = {
    host: "91.238.160.176" || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: "ipadvice_root",
    password: "heavenking1432",
    database: 'ipadvice_db'
  };
  

export async function GET() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      'SELECT * FROM app_data WHERE id = ?',
      [1]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Data not found" },
        { status: 404 }
      );
    }

    const data = rows[0];
    
    // Parse the JSON content if it's stored as a string
    if (typeof data.content === 'string') {
      data.content = JSON.parse(data.content);
    }

    return NextResponse.json(
      { message: "Data fetched successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
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