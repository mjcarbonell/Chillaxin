import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String, // URL to the image
    
    // Add any additional fields as required
});

const Post = mongoose.models.Posts || mongoose.model('Posts', PostSchema);

export default Post;
