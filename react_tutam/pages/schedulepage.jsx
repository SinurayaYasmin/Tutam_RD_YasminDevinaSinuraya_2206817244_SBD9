import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Card from './Card';
import "./schedulepage.css";

function SchedulePage() {
    const { email } = useParams();
    const [userDetail, setUserDetail] = useState(null);
    const [schedules, setSchedules] = useState([]);


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

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await fetch('http://localhost:4000/planeT/getSchedule');
                const datas = await response.json();
                if (response.status === 200) {
                    setSchedules(datas.allSchedule);
                } else {
                    alert(datas.message || 'Failed to get schedules');
                }
            } catch (error) {
                console.error(error);
                alert('Error occurred while fetching schedules');
            }
        };

        fetchSchedules();
    }, []);

  return (
    <div className='bgsc'>
    <div className="bgscc">
      <h1 className='text1'>PlaneT</h1>
      <div className="test">
        <Link to={`/mainPage/${email}`} className="notactive">Profile</Link>
        <Link to={`/bookingPage/${email}`} className="notactive">Booking Ticket</Link>
        <Link to={`/updateTicketPage/${email}`} className="notactive">Update Ticket</Link>
        <Link to={`/schedulePage/${email}`} className="active">Schedule</Link>
      </div>
      <div className="schedule-page">
    <h1 className="airlinesch">Airline Schedules</h1>
    <div className="cards-container">
        {schedules.map((schedule, index) => (
            <Card key={index} schedule={schedule} />
        ))}
    </div>
</div>
    </div>
  </div>

    
  );
}

export default SchedulePage;
