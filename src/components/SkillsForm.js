import React, { useState } from 'react';
import '../styles/popup.css'; // Import the styles

const SkillsForm = ({ onSubmit, onClose }) => {
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('');
const userId = localStorage.getItem("loginId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsData = {
      skillName,
      proficiency,
    };
    
    // Send POST request to backend
    try {
      const response = await fetch('http://localhost/linkedin/linkedin/backend/add_profile_data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'addSkills',
          userId: userId, 
          ...skillsData
        })
      });
      const data = await response.json();
      console.log(data); // Handle response from backend
    } catch (error) {
      console.error('Error:', error);
    }
    
    // Call onSubmit callback
    onSubmit(skillsData);
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>Add Skill</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Skill Name" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
          <select value={proficiency} onChange={(e) => setProficiency(e.target.value)}>
            <option value="">Select Proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button type="submit">Add Skill</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default SkillsForm;
