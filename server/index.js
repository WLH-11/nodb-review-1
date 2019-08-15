// Packages
const express = require('express');
const cors = require('cors');
// Controllers
const userCtrl = require('./controllers/userController');
// App Setup
const app = express();
// Top Level Middleware
app.use(express.json());
app.use(cors());
// Endpoints
app.get('/api/users', userCtrl.getUsers);
app.post('/api/users', userCtrl.addUser);
app.put('/api/users/:id', userCtrl.updateUser);
app.delete('/api/users/:id', userCtrl.removeUser);
// Server Listening
app.listen(3005, () => {
    console.log('Server Running!')
});