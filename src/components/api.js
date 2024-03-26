// api.js



// Function to fetch user profile data
export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`http://localhost/linkedin/linkedin/backend/profile.php?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Function to update user profile data
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`http://localhost/linkedin/linkedin/backend/profile.php?user_id=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
      mode: 'no-cors'
    });
    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Function to follow a user
export const followUser = async (followerId, followedId) => {
  try {
    const response = await fetch(`http://localhost/linkedin/linkedin/backend/profile.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerId,
        followedId,
        action: 'follow',
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to follow user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

// Function to unfollow a user
export const unfollowUser = async (followerId, followedId) => {
  try {
    const response = await fetch(`http://localhost/linkedin/linkedin/backend/profile.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerId,
        followedId,
        action: 'unfollow',
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to unfollow user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};
