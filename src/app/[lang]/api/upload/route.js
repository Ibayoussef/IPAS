import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');
  const name = data.get('name')

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${name}${path.extname(file.name)}`;
  const filepath = path.join(process.cwd(), 'public', 'images', filename);

  try {
    await writeFile(filepath, buffer);
    return NextResponse.json({ success: true, filename });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ success: false, message: "Failed to save file" }, { status: 500 });
  }
}