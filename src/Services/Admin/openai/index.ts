import Cookies from "js-cookie";

export const handleGenerateText = async (formData: any) => {
    
    try {
      // Add the new message to the conversation history
      const messages = [{ role: 'user', content: formData }];

      const response = await fetch('/api/openai/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('data in add new post (service) => ', data);

      return data;
      
    } catch (error) {
      console.error("Error in fetching:", error);
    }
  };

  export const handleGenerateImage = async (prompt: string) => {
    try {
      // Prepare the prompt for the image generation
      const requestBody = { prompt: prompt };
  
      const response = await fetch('/api/openai/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('data in handleGenerateImage => ', data);
  
      return data;
      
    } catch (error) {
      console.error("Error in fetching:", error);
    }
  };

  export const fetchBase64Image = async (imageUrl: string) => {
    try {
      const response = await fetch('/api/openai/download-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageUrl ),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };
    