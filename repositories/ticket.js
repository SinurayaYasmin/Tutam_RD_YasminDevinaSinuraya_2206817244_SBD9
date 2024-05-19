const { Pool } = require("pg");
const Database = "tutam9_yasmin";

const pool = new Pool({
  user: "admin",
  password: "abc123",
  database: Database,
  
});

pool.connect().then(() => {
  console.log("Connected to the database", Database, " || Ticket OK!");
});


//To booking ticket
async function createTicket(req, res){
    const {first_name, last_name, date_order, date_departing, departing_city, destination_city, departing_time, airline, airplane_code, seat} = req.body;
    try{
        const result = await pool.query(
          `INSERT INTO ticket_table (first_name, last_name, date_order, date_departing, departing_city, destination_city, departing_time, airline, airplane_code, seat) 
            SELECT '${first_name}', '${last_name}', '${date_order}', '${date_departing}', '${departing_city}', '${destination_city}', '${departing_time}', '${airline}', '${airplane_code}', '${seat}' 
            WHERE EXISTS (
                SELECT 1 FROM plane_table 
                WHERE plane_id = '${airplane_code}' AND '${seat}' = ANY(plane_seat) AND airline = '${airline}' AND time_departing = '${departing_time}'
            )
            RETURNING *`
        );

        //If booking ticket failed
        if (result.rows.length === 0) {
          return res.status(400).json( {mesage: "Airline/Airplane Code/Seat/Departing Time Not Found! || Please Check Your Input"});  
        }
        //If booking ticket success
        else if (result.rows.length !== 0) {
          //Remove the seat that has been booked by user
          const update = await pool.query(
            `UPDATE plane_table 
            SET plane_seat = array_remove(plane_seat, '${seat}') 
            WHERE '${seat}' = ANY(plane_seat) AND plane_id = '${airplane_code}' RETURNING *`
        );
        //If remove seat success, it means booking ticket is complete
        if(update.rows.length !== 0){
          return res.status(200).json( {message: "Booking Ticket Succesfully", ticket:result.rows});
        }
        }
      } catch (error) {
        return res.status(500).json({ error: "There's something wrong", detail: error.message }); 
      }

    }

//Function to handle update seat on ticket
async function updateTicket(req, res){
      const {first_name, last_name, airplane_code, old_seat, new_seat} = req.body;
      try{
          //Change old seat with new seat
          const result = await pool.query(
              `UPDATE ticket_table SET seat = '${new_seat}' WHERE first_name = '${first_name}' AND last_name = '${last_name}' AND airplane_code = '${airplane_code}' AND seat = '${old_seat}' RETURNING *`
          );
          
          //If change the seat success
          if (result.rows.length !== 0){
            //Remove the new seat that has been booked
            const removeSeat = await pool.query(
              `UPDATE plane_table 
              SET plane_seat = array_remove(plane_seat, '${new_seat}') 
              WHERE '${new_seat}' = ANY(plane_seat) AND plane_id = '${airplane_code}' RETURNING *`
            );

            //If remove seat success
            if (removeSeat.rows.length !== 0){
              //Return the old seat to the plane_table
              const returnSeat = await pool.query(
                `UPDATE plane_table 
                SET plane_seat = plane_seat || ARRAY['${old_seat}'] 
                WHERE plane_id = '${airplane_code}' RETURNING *`
              );
              //If return the old seat success, it means update seat is complete
              if (returnSeat.rows.length !== 0){
                return res.status(200).json( {message: "Update Seat Succesfully!", newTicket: result.rows});
            }
          }
        }
        else{
          return res.status(400).json( {mesage: "Airline/Airplane Code/Seat/ Departing Time Not Found! Please Check Your Input"});  
        }
        

        } catch (error) {
          return res.status(500).json({ error: "There's something wrong", detail: error.message }); 
        }
  
      }

//Function to handle read user's ticket
async function getTicket(req, res){
      const {ticket_id} = req.params;   
        try{
            const result = await pool.query(
                `SELECT * FROM ticket_table WHERE ticket_id = '${ticket_id}' `
            );
            //If get ticket failed
            if (result.rows.length === 0) {
              res.status(400).json( {message: "Failed To Get Ticket! Make Sure Yout Ticked ID is Correct"});  
            }
            //If get ticket success
            else if (result.rows.length !== 0) {
              res.status(200).json( {message: "Success To Get Your Ticket!", yourTicket: result.rows});
            }
            
          } catch (error) {
            res.status(500).json({ error: "There's something wrong", detail: error.message }); 
          }
    
        }

//Function to handle cancel ticket
async function cancelTicket(req, res){
      const {ticket_id} = req.params;
        try{
            const result = await pool.query(
                `DELETE FROM ticket_table WHERE ticket_id = '${ticket_id}'`
            );
  
            //If cancel ticket success
            if (result.rowCount>0) {
              return res.status(200).json( {message: "Success To Cancel Your Ticket!"});
            } else{
              return res.status(400).json( {message: "Failed To Cancel Yout Ticket! Make Sure Yout Ticked ID is Correct || Tips: Ticket ID is 32 Characters Longs and Has 4 strip line (-) || Make Sure There's No Space Before and After The Ticket ID!"});  
            }
            
            
          } catch (error) {
            return res.status(500).json({ error: "There's something wrong", detail: error.message }); 
          }
    
        }

module.exports = { createTicket, updateTicket, getTicket, cancelTicket};