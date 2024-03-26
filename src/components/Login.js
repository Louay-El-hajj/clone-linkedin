import React, { useState } from 'react';
import '../styles/LoginForm.css';
import logo from '../logo2.png'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/linkedin/linkedin/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        const loginId = data.userId // Replace this with the actual login ID

          // Set the login ID to local storage
          localStorage.setItem("loginId", loginId);
        window.location.href = "/profile"; // Redirect upon successful login
      } else {
        // Handle login failure ( display error message)
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
            <img src={logo} alt="logo" /> {/* Use the imported image */}

      <div className="headtext">
        <p>Welcome to your</p>
        <p>professional community</p>
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-heading">Login</h2>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Login</button>
          <p className="signup-link">Don't have an account? <a href="/signup" className="signup-anchor">Sign up</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
