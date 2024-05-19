const { Pool } = require("pg");
const Database = "tutam9_yasmin";


//To connect to PSQL database
const pool = new Pool({
  user: "admin",
  password: "abc123",
  database: Database,
  
});

pool.connect().then(() => {
    console.log("Connected to the database", Database, " || Account OK!");
});

//Function to handle register account
async function register(req, res) {
  const { email, username, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO user_table (email, username, password) VALUES ($1, $2, $3) RETURNING *', 
      [email, username, password]
    );
    if (result.rows.length !== 0) {
      return res.status(200).json({ message: "Success To Register Account!", account: result.rows });
    } else {
      return res.status(400).json({ message: "Failed To Register Account! || Make sure your E-mail and username are string, and password minimum 8 characters" });
    }
  } catch (error) {
    return res.status(500).json({ error: "There's something wrong", detail: error.message });
  }
}

//Function to handle login
async function login(req, res){
    const {email, password} = req.body;
    try{
        const result = await pool.query(
            'SELECT * FROM user_table WHERE email = $1 AND password = $2 ', [email, password]
        );
    
        if (result.rows.length !==0){
            return res.status(200).json({success: true, message: "Success To Login!", account: result.rows});    
        }
        else {
          return res.status(400).json({message: "Failed To Login! || Make sure your E-mail and Password are correct!"});    
        }
        
      } catch (error) {
        res.status(500).json({ error: "There's something wrong", detail: error.message }); 
      }
}

//Function to handle remove account
async function removeAccount(req, res){
    const {email} = req.params;
    try{
        const result = await pool.query(
            `DELETE FROM user_table WHERE email = '${email}'`
        );

        if (result.rows.length ===0){
            return res.status(200).json({message: "Delete Account Succesfully!"});
        }
        else {
          return res.status(400).json({message: "Delete Account Failed! Make Sure Your Username or E-mail Are Correct!"});
        }
        
      } catch (error) {
        return res.status(500).json({ error: "There's something wrong", detail: error.message }); 
      }

    }

    async function getUser(req, res){
      const {email} = req.params;
      try{
          const result = await pool.query(
              `SELECT * FROM user_table WHERE email = '${email}'`
          );
          if(result.rows.length !==0){
              return res.status(200).json({message: "Success To Get Account", account: result.rows});
          }
          else {
            res.status(404).json({ message: "Account not found" });
        } }catch (error) {
          return res.status(500).json({ error: "There's something wrong", detail: error.message }); 
        }
  
      }
module.exports = { register, login, removeAccount, getUser};