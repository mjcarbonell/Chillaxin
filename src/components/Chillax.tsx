import React, { useState } from 'react';
import { add_new_post } from '@/Services/Admin/post';

const Chillax = () => {
  const [postText, setPostText] = useState('');

  const handlePostSubmit = async () => {
    // Assuming postText is the content of the post and you need to add a title
    const postData = {
        title: "Post Title[Default]", 
        content: postText, 
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
    </>
  );
};

export default Chillax;
