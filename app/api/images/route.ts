import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');
  if (!folder) {
    return NextResponse.json({ error: 'Missing folder parameter' }, { status: 400 });
  }

  // Only allow specific folders for security
  const allowedFolders = ['hero-images', 'brand-logos'];
  if (!allowedFolders.includes(folder)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
  }

  const imagesDir = path.join(process.cwd(), 'public', folder);
  let files: string[] = [];
  try {
    files = fs.readdirSync(imagesDir).filter((file) => {
      return /\.(jpe?g|png|svg)$/i.test(file);
    });
  } catch (e) {
    return NextResponse.json({ error: 'Unable to read directory' }, { status: 500 });
  }

  // Return public paths
  const imagePaths = files.map((file) => `/${folder}/${file}`);
  return NextResponse.json({ images: imagePaths });
}

