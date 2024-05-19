const express = require ("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 4000;
const app = express();
const ticket = require('./repositories/ticket');
const account = require('./repositories/account');
const schedule = require('./repositories/schedule');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Endpoint CRUD
//CREATE
app.post('/planeT/createTicket', ticket.createTicket);  
app.post('/planeT/register', account.register);
app.post('/planeT/login', account.login);

//READ
app.get('/planeT/getTicket/:ticket_id', ticket.getTicket);
app.get('/planeT/getSchedule', schedule.getSchedule);
app.get('/planeT/getUser/:email', account.getUser);

//UPDATE
app.put('/planeT/updateTicket', ticket.updateTicket);

//DELETE
app.delete('/planeT/removeAccount/:email', account.removeAccount);
app.delete('/planeT/cancelTicket/:ticket_id', ticket.cancelTicket);

app.listen(port, ()=> {
    console.log("Server running on port ", port);
});
