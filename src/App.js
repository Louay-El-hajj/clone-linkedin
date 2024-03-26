import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Profile from './components/Profile';
import ViewProfile from './components/ViewProfile';


function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add_post" element={<PostForm />} />
          <Route path="/" element={<PostList />} />
          <Route path="/profile" element={<Profile />} />
        <Route path="/View_Profile/:userId" element={<ViewProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
