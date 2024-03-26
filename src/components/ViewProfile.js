import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import EducationForm from './EducationForm';
import ExperienceList from './ExperienceList';
import SkillsList from './SkillsList';
import EducationList from './EducationList';
import { getUserProfile, followUser, unfollowUser } from './api.js'; // Functions to fetch and update user profile data

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
 const { userId } = useParams();
  const loggedinuser = localStorage.getItem("loginId");
console.log(loggedinuser)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfileData(data);
        const isUserFollowed = data.follows.some(follow => follow.follower_id == loggedinuser);
        //console.log(loggedinuser)
        //console.log(isUserFollowed)
        setIsFollowed(isUserFollowed); // Assuming isFollowed is returned by the backend
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, [userId]);




  const handleFollow = async () => {
    try {
      await followUser(localStorage.getItem("loginId"),userId);
      setIsFollowed(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(loggedinuser,userId);
      setIsFollowed(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };
  console.log(isFollowed)
console.log(profileData)
  return (
    <div>
      {profileData && (
        <div>
          <h2>{profileData.username}</h2>
          {/* Display other user information */}
          <ExperienceList experience={profileData.experience} />
 
         

          <SkillsList skills={profileData.skills} />

          <EducationList education={profileData.education} />

          
          


          {isFollowed ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
