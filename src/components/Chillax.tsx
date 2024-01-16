"use client"
import React, { useState } from 'react';
import { add_new_post, get_all_posts   } from '@/Services/Admin/post';
import { useEffect } from 'react'
import { handleGenerateImage, handleGenerateText, fetchBase64Image } from '@/Services/Admin/openai';
import Image from 'next/image';
import axios from 'axios';

interface Post {
  title: string;
  content: string;
  image: string; 
}

const Chillax = () => {
  const [postText, setPostText] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [inputMessageRenaissance, setInputMessageRenaissance] = useState('');
  const [output, setOutput] = useState('');
  const [image, setImage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]); // State to store posts

  useEffect(() => {
    FetchDataOfPosts()
  }, [])

  const FetchDataOfPosts = async () => {
    console.log("before await all posts");
    const allPosts = await get_all_posts();
    console.log("ALL POSTS"); 
    if(allPosts){
      setPosts(allPosts.data);
    }
    console.log(allPosts);
    
    // console.log(allPosts.data[0].image);

  }
  

  const handlePostSubmit = async () => {
    const inputMessageTitle = "create a renaissance art title based off of " + inputMessage; 
    const artTitle = await handleGenerateText(inputMessageTitle); 
    const artImage = await handleGenerateImage(artTitle.output.content);
    
    const artBlob = await fetchBase64Image(artImage.output.data[0]['url']);
    

    // console.log(typeof artBlob);
    // console.log(typeof artBlob.base64Image);
    // console.log("ARTBLOB");
    // console.log(artBlob);


    const postData = {
      title: artTitle.output.content, 
      content: inputMessage, 
      image: artBlob.base64Image, 
    };
    
    const post = await add_new_post(postData);
  }

  return (
    <>
      {/* Your existing code */}
      <div>
        {/* Your page content goes here */}
        {/* <input
          type="text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        /> */}
        <button onClick={handlePostSubmit}>Submit Post</button>
      </div>

      <div>
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
      </div>
      {posts.length > 0 && posts.map((post, index) => (
        <div key={index} className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <div className="image-container">
            {<Image 
              src={`data:image/jpeg;base64,${post.image}`} 
              alt={post.title}
              width={500} // Set the desired width
              height={300} // Set the desired height
              className="post-image"    
            /> }
          </div>
        </div>
      ))}
      
    </>
  );
};

export default Chillax;

