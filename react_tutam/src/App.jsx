import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/planeT/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const datas = await response.json();
      
      if (response.status === 200) {
        //alert(`Registration Successful! Message: ${datas.message}, Account: ${JSON.stringify(datas.account[0])}`);
        //navigate("/mainPage/");
        navigate(`/mainPage/${encodeURIComponent(email)}`);
      } else {
        alert(`${datas.message})}`);
      }
    } catch (error) {
      alert('There was an error. Please try again later.');
    }
  };

  return (
    <div className='bg'>
      <form className="form-container" onSubmit={handleLogin}>
        <h1 className="text_title">Welcome To PlaneT</h1>
        <h2 className="text_sub">Get Your Ticket Now!</h2>
        <div className='marg'>
          <label htmlFor="email" className='text'>E-mail</label>
          <input type="email" id="email" className='input_box' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="marg">
          <label htmlFor="password" className="text">Password</label>
          <input type="password" id="password" className="input_box" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        
        <h2 className='to_login'>Doesn't Have An Account?</h2>
        <Link to={`/register`} className='to_login_link'>Register Now</Link>
        
        <button type="submit" className='button'>Login</button>
      </form>
    </div>
  );
}

export default Login;
