import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'src', 'app','data', 'index.js');
    const fileContent = `export const data = ${JSON.stringify(data, null, 2)};`;
    
    await fs.writeFile(filePath, fileContent, 'utf8');
    
    return NextResponse.json({ message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}