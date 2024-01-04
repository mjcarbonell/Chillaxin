import React, { useState } from 'react';
import { add_new_post } from '@/Services/Admin/post';
import { handleGenerateText } from '@/Services/Admin/openai';
// This should be a server-side function

const Chillax = () => {
  const [postText, setPostText] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [inputMessageRenaissance, setInputMessageRenaissance] = useState('');

  const [output, setOutput] = useState('');

  const handlePostSubmit = async () => {
    
    const inputMessageTitle = "create a renaissance art title based off of " + inputMessage; 
    const artTitle = await handleGenerateText(inputMessageTitle); 

    console.log("GENERATED TEXT");
    console.log(artTitle);

    const postData = {
      title: artTitle.output.content, 
      content: inputMessage, 
    };

    const post = await add_new_post(postData);
};
  return (
    <>
      {/* Your existing code */}
      <div>
        {/* Your page content goes here */}
        <input
          type="text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
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
