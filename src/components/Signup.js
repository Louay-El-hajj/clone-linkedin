import React, { useState } from 'react';
import '../styles/signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('individual');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/linkedin/linkedin/backend/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email, name, type })
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        window.location.href = "/login"; // Redirect to login page upon successful signup
      } else {
        console.log(data.message);
        // Handle signup failure (e.g., display error message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='signup'>
      <div>
      <p className='headertext'>Make the most of your professional life</p>
      </div>
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2 className="signup-heading">Signup</h2>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="individual">Individual</option>
            <option value="company">Company</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Signup</button>
        <p>Already on LinkedIn?  <span className='bleu'><a href='login'>Signin</a></span>  </p>

      </form>

    </div>
    </div>
  );
}

export default Signup;
