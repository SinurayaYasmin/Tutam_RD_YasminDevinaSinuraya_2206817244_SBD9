import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./mainpage.css";

function MainPage() {
    const navigate = useNavigate();
    const [showBookingForm, setRemoveAccount] = useState('');
    const { email } = useParams();
    const [ticket_id, setTicket] = useState('');
    const [userDetail, setUserDetail] = useState(null);
  
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

    const handleRemoveAccountClick = async () => {
        try {
          const response = await fetch(`http://localhost:4000/planeT/removeAccount/${encodeURIComponent(email)}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (response.status === 200) {
            alert('Account removed successfully');
            navigate('/login'); 
          } else {
            alert('Failed to remove account');
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while trying to remove the account');
        }
    };

    const handleGetTicketClick = async () => {
        event.preventDefault();
        try {
          const response = await fetch(`http://localhost:4000/planeT/getTicket/${encodeURIComponent(ticket_id)}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const datas = await response.json();
          if (response.status === 200) {
            alert(` Message: ${datas.message}, Account: ${JSON.stringify(datas.yourTicket[0])}`);
            
          } else {
            alert('Failed To Get Ticket');
          }
        } catch (error) {
          console.error(error);
          alert('Error Occured');
        }
    };

    const handleCancelTicketClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/planeT/cancelTicket/${encodeURIComponent(ticket_id)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('Ticket cancelled successfully');
            } else {
                alert('Failed to cancel ticket');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while trying to cancel the ticket');
        }
    };

  return (
    <div className='bg'>
      <div className="bg2">
        <h1 className='text1'>PlaneT</h1>
        <div className="test">
          <Link to={`/mainPage/${email}`} className="active">Profile</Link>
          <Link to={`/bookingPage/${email}`} className="notactive">Booking Ticket</Link>
          <Link to={`/updateTicketPage/${email}`} className="notactive">Update Ticket</Link>
          <Link to={`/schedulePage/${email}`} className="notactive">Schedule</Link>
        </div>
        <div className="form-container">
          <p className="textprofile">Your Profile</p>
          <p className="userdetail">User ID: {userDetail ? userDetail.user_id : ""}</p>
          <p className="userdetail">Username: {userDetail ? userDetail.username : ""}</p>
          <p className="userdetail">Email: {userDetail ? userDetail.email : ""}</p>
          <input type="text" id="username" className='input_boxprofile' placeholder="Input Your Ticket ID, and Click 'See Your Ticket'" value={ticket_id} onChange={(e) => setTicket(e.target.value)}  required />
          <button onClick={handleRemoveAccountClick} className='buttonmp'>Remove Account</button>
          <button onClick={handleGetTicketClick} className='buttonmp'>See Your Ticket</button>
          <button onClick={handleCancelTicketClick} className='buttonmp'>Cancel Your Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
