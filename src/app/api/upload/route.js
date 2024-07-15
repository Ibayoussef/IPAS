import { NextResponse } from "next/server";
import { supabase } from "../lib/supabaseClient";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");
  const name = data.get("name");

  if (!file) {
    return NextResponse.json(
      { success: false, message: "No file uploaded" },
      { status: 400 }
    );
  }

  try {
    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(buffer);

    // Get file type
    const fileType = file.type;

    const { data: uploadData, error } = await supabase.storage
      .from("images")
      .upload(`${name}`, fileBuffer, {
        contentType: fileType,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);

    if (urlError) {
      console.error("Error getting public URL:", urlError);
      throw urlError;
    }

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save file", error: error.message },
      { status: 500 }
    );
  }
}
