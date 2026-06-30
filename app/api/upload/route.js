import { NextResponse } from 'next/server';

// Vercel serverless function max duration (in seconds)
export const maxDuration = 60;

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Call Gemini API
    const { GoogleGenAI } = await import('@google/genai');
    
    // Default to the provided API key from env
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API Key is missing in backend.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // We pass the document as inlineData to Gemini
    // For PDFs, mimeType is 'application/pdf'
    // For Word, we might need a different approach or Gemini might support it, but assuming PDF for now.
    const mimeType = file.type || 'application/pdf';

    const prompt = `You are a professional document translator and parser. 
Your job is to read this document (which might contain text, images, and tables) and extract its structure.
Translate the text to Indonesian (Bahasa Indonesia).

Please output the result STRICTLY as a raw JSON object (without any markdown formatting like \`\`\`json) matching this exact format:
{
  "name": "Translated Document",
  "versions": {
    "V1": [
      {
        "type": "heading",
        "level": 1,
        "content": [
          { "type": "paragraph", "en": "Original Heading text", "id": "Indonesian translated heading" }
        ]
      },
      {
        "id": "section-1",
        "title": "Original Title",
        "content": [
          { "type": "paragraph", "en": "Original English paragraph text here", "id": "Translated Indonesian paragraph text here" }
        ]
      }
    ]
  }
}

Important Rules:
1. Follow the 'en' and 'id' format strictly for every piece of text.
2. Group related paragraphs under sections with a title.
3. Be comprehensive and capture the essence of the document.`;

    console.log("Sending file to Gemini...");
    
    // Generate content using gemini-1.5-pro for best multimodal support
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: [
            prompt,
            {
                inlineData: {
                    data: buffer.toString("base64"),
                    mimeType: mimeType
                }
            }
        ]
    });

    const textResult = response.text;
    console.log("Gemini response received");
    
    // Try to parse the JSON returned by Gemini
    let parsedJson;
    try {
        // Strip markdown blocks if Gemini accidentally included them
        const cleanedText = textResult.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
        parsedJson = JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse Gemini JSON output:", textResult);
        return NextResponse.json({ 
            error: 'AI generated invalid JSON structure.', 
            rawOutput: textResult 
        }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Document parsed and translated by Gemini!',
      fileName: file.name,
      documentData: parsedJson
    });

  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
