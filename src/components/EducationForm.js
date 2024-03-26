import React, { useState } from 'react';
import '../styles/popup.css'; // Import the styles

const EducationForm = ({ onSubmit, onClose }) => {
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
const userId = localStorage.getItem("loginId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const educationData = {
      institution,
      degree,
      fieldOfStudy,
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
          action: 'addEducation',
          userId: userId, // Replace with actual user ID
          ...educationData
        })
      });
      const data = await response.json();
      console.log(data); // Handle response from backend
    } catch (error) {
      console.error('Error:', error);
    }

    // Call onSubmit callback
    onSubmit(educationData);
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>Add Education</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
          <input type="text" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
          <input type="text" placeholder="Field of Study" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
          <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add Education</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
