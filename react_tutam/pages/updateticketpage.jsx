import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./updateticketpage.css";

function UpdateTicketPage() {
  
  const [userDetail, setUserDetail] = useState(null);
  const { email } = useParams();
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [airplane_code, setAirCode] = useState('');
  const [old_seat, setOldSeat] = useState('');
  const [new_seat, setNewSeat] = useState('');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/planeT/getUser/${encodeURIComponent(email)}`);
        if (response.status === 200) {
          const data = await response.json();
          setUserDetail(data.account[0]);
        } else if (response.status === 404) {
          alert("Account not found");
        } else {
          alert("Failed to get user details");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to get user details");
      }
    };

    getDetails();
  }, [email]);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/planeT/updateTicket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, airplane_code, old_seat, new_seat}),
      });
      const datas = await response.json();

      if (response.status === 200) {
        alert(`${datas.message}`);
        // Optionally, you can navigate to another page or reset the form here
        // navigate(`/somePage/${email}`);
      } else {
        alert(`${datas.message}`);
      }
    } catch (error) {
      alert('There was an error update your ticket. Please try again later.');
    }
  };



  return (
    <div className='bg'>
      <div className="bg2">
        <h1 className='text1'>PlaneT</h1>
        <div className="test">
        <Link to={`/mainPage/${email}`} className="notactive">Profile</Link>
        <Link to={`/bookingPage/${email}`} className="notactive">Booking Ticket</Link>
        <Link to={`/updateTicketPage/${email}`} className="active">Update Ticket</Link>
        <Link to={`/schedulePage/${email}`} className="notactive">Schedule</Link>
        </div>
        <div className="form-containerup">
          <p className="updatetitle">Update Your Ticket</p>
          <form onSubmit={handleRegister}>
              <input type="text" id="firstname" className='updatebox' value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
              <input type="text" id="lastname" className='updatebox' value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
              <input type="text" id="airplanecode" className='updatebox' value={airplane_code} onChange={(e) => setAirCode(e.target.value)} placeholder="Airplane Code (Ex: SRI05)" required />
              <input type="text" id="oldseat" className='updatebox' value={old_seat} onChange={(e) => setOldSeat(e.target.value)} placeholder="Old Seat (Ex: A1)" required />
              <input type="text" id="newseat" className='updatebox' value={new_seat} onChange={(e) => setNewSeat(e.target.value)} placeholder="New Seat (Ex: A2)" required />
              
              <button className='buttonup'>Update</button>
            </form>

          

          
          
           
          
        </div>
      </div>
    </div>
  );
}

export default UpdateTicketPage;
