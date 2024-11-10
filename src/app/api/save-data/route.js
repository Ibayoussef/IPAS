import { NextResponse } from "next/server";
import { supabase } from "../lib/supabaseClient";

export async function POST(request) {
  try {
    const payload = await request.json();

    // Check if the row exists
    const { data: existingData, error: checkError } = await supabase
      .from("app_data")
      .select()
      .eq("id", 1)
      .single();

    let result;
    if (checkError && checkError.code === "PGRST116") {
      // Row doesn't exist, so insert
      result = await supabase
        .from("app_data")
        .insert({ id: 1, content: payload })
        .select();
    } else {
      // Row exists, so update
      result = await supabase
        .from("app_data")
        .update({ content: payload })
        .eq("id", 1)
        .select();
    }

    const { data, error } = result;

    if (error) throw error;

    return NextResponse.json(
      { message: "Data saved successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { message: "Error saving data", error },
      { status: 500 }
    );
  }
}
