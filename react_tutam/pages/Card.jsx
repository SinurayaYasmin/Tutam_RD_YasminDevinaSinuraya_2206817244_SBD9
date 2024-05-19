import React from 'react';
import './schedulepage.css';

function Card({ schedule }) {
    return (
        <div className="card">
            <h3 className='airline'>{schedule.airline}</h3>
            <p className='airplanedetail'>Plane ID: {schedule ? schedule.plane_id : ""}</p>
            <p className='airplanedetail'>Departing  City: {schedule ? schedule.departing : ""}</p>
            <p className='airplanedetail'>Destination  City: {schedule ? schedule.destination : ""}</p>
            <p className='airplanedetail'>Departing  Time: {schedule ? schedule.time_departing : ""}</p>
            <p className='airplanedetail'>Destination  Time: {schedule ? schedule.time_destination : ""}</p>
            <p className='airplanedetail'>Seat Available: {schedule ? schedule.plane_seat.join(' || ') : ""}</p>
            
        </div>
    );
}

export default Card;
