import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/profile.css"
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import EducationForm from './EducationForm';
import ExperienceList from './ExperienceList';
import SkillsList from './SkillsList';
import EducationList from './EducationList';
import { getUserProfile, followUser, unfollowUser } from './api.js'; // Functions to fetch and update user profile data

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
const userId = localStorage.getItem("loginId");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfileData(data);
        setIsFollowed(data.isFollowed); // Assuming isFollowed is returned by the backend
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleAddExperienceClick = () => {
    setShowExperienceForm(true);
  };

  const handleAddSkillsClick = () => {
    setShowSkillsForm(true);
  };

  const handleAddEducationClick = () => {
    setShowEducationForm(true);
  };

  const handleCloseForm = () => {
    setShowExperienceForm(false);
    setShowSkillsForm(false);
    setShowEducationForm(false);
  };

  const handleExperienceSubmit = async (experienceData) => {
    try {
    //  await updateUserProfile(userId, { experience: experienceData });
      // Update state or fetch profile data again
      setShowExperienceForm(false); // Close the form after submission
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const handleSkillsSubmit = async (skillsData) => {
    try {
     // await updateUserProfile(userId, { skills: skillsData });
      // Update state or fetch profile data again
      setShowSkillsForm(false); // Close the form after submission
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  const handleEducationSubmit = async (educationData) => {
    try {
    //  await updateUserProfile(userId, { education: educationData });
      // Update state or fetch profile data again
      setShowEducationForm(false); // Close the form after submission
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  const handleFollow = async () => {
    try {
      await followUser(userId,userId);
      setIsFollowed(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId);
      setIsFollowed(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };
console.log(profileData)
  return (
    <div>
      <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          LinkedIn
        </a>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-button">Search</button>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-links">
              My Network
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-links">
              Jobs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-links">
              Messaging
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-links">
              Notifications
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-links">
              Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div className='info'>
      <section className="profile-page">
        <div className="profile-section">
          <div className="profile-header">
          {profileData && (
        <div>
          <h2>{profileData.username}</h2>
          {/* Display other user information */}
          <ExperienceList experience={profileData.experience} />
          {showExperienceForm && (
            <ExperienceForm onSubmit={handleExperienceSubmit} onClose={handleCloseForm} />
          )}
          <button onClick={handleAddExperienceClick}>Add Experience</button>
         

          <SkillsList skills={profileData.skills} />
           {showSkillsForm && (
            <SkillsForm onSubmit={handleSkillsSubmit} onClose={handleCloseForm} />
          )}
           <button onClick={handleAddSkillsClick}>Add Skills</button>
          <EducationList education={profileData.education} />
          {showEducationForm && (
            <EducationForm onSubmit={handleEducationSubmit} onClose={handleCloseForm} />
          )}
          <button onClick={handleAddEducationClick}>Add Education</button>
          
          

        </div>
      )}
          </div>
          <div className="profile-buttons">
          </div>
        </div>
      </section>
      </div>



    </div>
  );
};

export default Profile;
