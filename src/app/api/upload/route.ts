import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file into /public/cv
    const filePath = path.join(process.cwd(), "public", "cv", file.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileUrl: `/cv/${file.name}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "File upload failed", details: String(err) },
      { status: 500 }
    );
  }
}
