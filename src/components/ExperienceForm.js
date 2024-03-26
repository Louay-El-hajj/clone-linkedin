import React, { useState } from 'react';
import '../styles/popup.css'; // Import the styles

const ExperienceForm = ({ onSubmit, onClose }) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem("loginId");

const handleSubmit = async (e) => {
    e.preventDefault();
    const experienceData = {
      company,
      position,
      startDate,
      endDate,
      description,
    };
    
    // Send POST request to backend
    try {
      const response = await fetch('http://localhost/linkedin/linkedin/backend/add_profile_data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'addExperience',
          userId: userId, // Replace with actual user ID
          ...experienceData
        })
      });
      const data = await response.json();
      console.log(data); // Handle response from backend
    } catch (error) {
      console.error('Error:', error);
    }
    
    // Call onSubmit callback
    onSubmit(experienceData);
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>Add Experience</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
          <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add Experience</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
