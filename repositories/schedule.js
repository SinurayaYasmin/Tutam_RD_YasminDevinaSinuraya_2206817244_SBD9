const { Pool } = require("pg");
const Database = "tutam9_yasmin";

const pool = new Pool({
  user: "admin",
  password: "abc123",
  database: Database,
  
});

pool.connect().then(() => {
    console.log("Connected to the database", Database, " || Schedule OK!");
});

//Function to get all available schedule
async function getSchedule(req, res){
    try{
        const result = await pool.query(
            `SELECT * FROM plane_table`
        );
        if(result.rows.length !==0){
            res.status(200).json({message: "Success To Get Airline's Schedule", allSchedule: result.rows});
        }
      } catch (error) {
        res.status(500).json({ error: "There's something wrong", detail: error.message }); 
      }

    }

module.exports = { getSchedule};