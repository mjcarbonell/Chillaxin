import Cookies from "js-cookie";

export const add_new_post = async (formData: any) => {
    try {
        const res = await fetch(`/api/Admin/post/add-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log('data in add new post (service) => ', data);
        return data;
    } catch (error) {
        console.log('Error in Adding a new post (service) =>', error);
    }
  }