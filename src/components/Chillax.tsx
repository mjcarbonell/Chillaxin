import React, { useState } from 'react';
import { add_new_post } from '@/Services/Admin/post';
import { handleGenerateImage, handleGenerateText, fetchBase64Image } from '@/Services/Admin/openai';

const Chillax = () => {
  const [postText, setPostText] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [inputMessageRenaissance, setInputMessageRenaissance] = useState('');
  const [output, setOutput] = useState('');
  const [image, setImage] = useState('');

  const handlePostSubmit = async () => {
    const inputMessageTitle = "create a renaissance art title based off of " + inputMessage; 
    const artTitle = await handleGenerateText(inputMessageTitle); 
    const artImage = await handleGenerateImage(artTitle.output.content);
    
    const artBlob = await fetchBase64Image(artImage.output.data[0]['url']);
    console.log(typeof artBlob);
    console.log(typeof artBlob.base64Image);
    console.log("ARTBLOB");
    console.log(artBlob);
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

      
    </>
  );
};

export default Chillax;
