import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../src/App.css";

function RegisterAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/planeT/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      const datas = await response.json();
      
      if (response.status === 200) {
        //alert(`Registration Successful! Message: ${datas.message}, Account: ${JSON.stringify(datas.account[0])}`);
        navigate(`/mainPage/${encodeURIComponent(email)}`);
      } else {
        alert(data.message || 'Failed to register account');
      }
    } catch (error) {
      alert('There was an error registering your account. Please try again later.');
    }

    
  };

  return (
    <div className='bg'>
      <form className="form-container" onSubmit={handleRegister}>
        <h1 className='text_titlereg'>Welcome To PlaneT</h1>
        <h2 className='text_subreg'>Get Your Ticket Now!</h2>
        <div className='marg'>
          <label htmlFor="email" className='text'>E-mail</label>
          <input type="email" id="email" className='input_box' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='marg'>
          <label htmlFor="username" className='text'>Username</label>
          <input type="text" id="username" className='input_box' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="marg">
          <label htmlFor="password" className="text">Password</label>
          <input type="password" id="password" className="input_box" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <h1 className='text_password'>*min 8 characters</h1>
        <h2 className='to_login'>Already have an account?</h2>
        <Link to={`/login`} className='to_login_link'>Login Now</Link>
        
        <button type="submit" className='button'>Register</button>
      </form>
    </div>
  );
}

export default RegisterAccount;
