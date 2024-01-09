import connectDB from "@/DB/connectDB";
import { NextResponse } from "next/server";
import Post from "@/model/Post";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDB();
  try {
    const getData = await Post.find({});
    if (getData) {
    return NextResponse.json({ success: true, data: getData });
    } else {
    return NextResponse.json({ status: 204, success: false, message: 'No posts found.' });
    }
  } catch (error) {
    console.log('Error in getting all Posts data :', error);
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' });
  }
}
