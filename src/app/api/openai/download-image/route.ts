import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';

export async function POST(req: Request, res: NextResponse) {
  const imageUrl = await req.json();

  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  
  // Handle the response as needed. The exact handling may depend on the format of the response.
  // console.log("done and FINISHED");
  // console.log(base64Image)
  return NextResponse.json({ base64Image: base64Image }, { status: 200 });
}

