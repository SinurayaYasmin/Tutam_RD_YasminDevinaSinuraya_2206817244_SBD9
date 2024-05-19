import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./bookingpage.css";

function BookingPage() {
  
  const [userDetail, setUserDetail] = useState(null);
  const { email } = useParams();
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [date_order, setDateOr] = useState('');
  const [date_departing, setDateDep] = useState('');
  const [departing_city, setDepCit] = useState('');
  const [destination_city, setDesCit] = useState('');
  const [departing_time, setDepTime] = useState('');
  const [airline, setAirline] = useState('');
  const [airplane_code, setAirCode] = useState('');
  const [seat, setSeat] = useState('');

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
      const response = await fetch('http://localhost:4000/planeT/createTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, date_order, date_departing, departing_city, destination_city, departing_time, airline, airplane_code, seat }),
      });
      const datas = await response.json();

      if (response.status === 200) {
        alert(`Message: ${datas.message}, Ticket ID: ${datas.ticket[0].ticket_id}`);
        // navigate(`/somePage/${email}`);
      } else {
        alert(`${datas.message}`);
      }
    } catch (error) {
      alert('There was an error booking your ticket. Please try again later.');
    }
  };



  return (
    <div className='bg'>
      <div className="bg2">
        <h1 className='text1'>PlaneT</h1>
        <div className="test">
        <Link to={`/mainPage/${email}`} className="notactive">Profile</Link>
        <Link to={`/bookingPage/${email}`} className="active">Booking Ticket</Link>
        <Link to={`/updateTicketPage/${email}`} className="notactive">Update Ticket</Link>
        <Link to={`/schedulePage/${email}`} className="notactive">Schedule</Link>
        </div>
        <div className="form-containerbook">
          <p className="bookingtitle">Booking Your Ticket</p>
          <form onSubmit={handleRegister}>
              <input type="text" id="firstname" className='input_boxbkl' value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
              <input type="text" id="lastname" className='input_boxbkr' value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
              <input type="text" id="dateorder" className='input_boxbkl' value={date_order} onChange={(e) => setDateOr(e.target.value)} placeholder="Date Order (YYYY-MM-DD)" required />
              <input type="text" id="datedeparting" className='input_boxbkr' value={date_departing} onChange={(e) => setDateDep(e.target.value)} placeholder="Date Departing (YYYY-MM-DD)" required />
              <input type="text" id="departingcity" className='input_boxbkl' value={departing_city} onChange={(e) => setDepCit(e.target.value)} placeholder="Departing City (Ex: BALI)" required />
              <input type="text" id="destinationcity" className='input_boxbkr' value={destination_city} onChange={(e) => setDesCit(e.target.value)} placeholder="Destination City (Ex: BALI)" required />
              <input type="text" id="departingtime" className='input_boxbkl' value={departing_time} onChange={(e) => setDepTime(e.target.value)} placeholder="Departing Time (HH:MM:SS)" required />
              <input type="text" id="airline" className='input_boxbkr' value={airline} onChange={(e) => setAirline(e.target.value)} placeholder="Airline (Ex: GARUDA)" required />
              <input type="text" id="airplanecode" className='input_boxbkl' value={airplane_code} onChange={(e) => setAirCode(e.target.value)} placeholder="Airplane Code (Ex: GAR01)" required />
              <input type="text" id="seat" className='input_boxbkr' value={seat} onChange={(e) => setSeat(e.target.value)} placeholder="Seat (Ex: A01)" required />
              <button className='buttonbk'>Book</button>
            </form>

          

          
          
           
          
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
