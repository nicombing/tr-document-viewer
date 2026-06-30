import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file received.' },
        { status: 400 }
      );
    }

    // Phase 3 & 4: Here we would parse the file buffer and send to AI
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Mock response for now to indicate the endpoint is working
    return NextResponse.json({ 
      success: true, 
      message: 'File successfully received by the backend!',
      fileName: file.name,
      fileSize: buffer.length
    });

  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
