import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  // Assuming 'body.prompt' contains the text prompt for the image generation
  const imageResponse = await openai.images.create({
    prompt: body.prompt,
    n: 1,  // Number of images to generate
    size: "1024x1024"  // Size of the image
  });

  // 'imageResponse.data' should contain the generated image(s)
  // Depending on the response format, you might need to adjust the handling here
  console.log(imageResponse.data);
  const theImage = imageResponse.data;

  return NextResponse.json({ output: theImage }, { status: 200 });
}