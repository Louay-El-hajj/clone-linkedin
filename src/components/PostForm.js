import React, { useState } from 'react';

const PostForm = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/linkedin/linkedin/backend/add_post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  content })
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

return (
  <form onSubmit={handleSubmit}>
    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content"></textarea>
       <button type="submit">Add Post </button>
  </form>
);
};

export default PostForm;
