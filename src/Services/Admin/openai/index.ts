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