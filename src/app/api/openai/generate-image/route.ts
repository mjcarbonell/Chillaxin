import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();
  const prompt = body.prompt; // Ensure the prompt for the image is passed in the request body

  const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1, // Number of images to generate
      size: "1024x1024" // Size of the image
    })
  });

  const imageData = await openaiResponse.json();

  // Handle the response as needed. The exact handling may depend on the format of the response.
  console.log(imageData);
  return NextResponse.json({ output: imageData }, { status: 200 });
}
