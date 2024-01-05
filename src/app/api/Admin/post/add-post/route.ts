import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Post from "@/model/Post"; // Assuming you have a Post model
import Joi from "joi";

const AddPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().required(),
  // Add other post fields here as required
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);
 
    
    const data = await req.json();

    const { title, content, image } = data; // Destructure your post fields

    const { error } = AddPostSchema.validate({ title, content, image }); 

    if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    const saveData = await Post.create(data); // Save the post

    if (saveData) {
    return NextResponse.json({ success: true, message: "Post added successfully!" });
    } else {
    return NextResponse.json({ success: false, message: "Failed to add the post. Please try again!" });
    }
    
  } catch (error) {
    console.log('Error in adding a new Post:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });
  }
}