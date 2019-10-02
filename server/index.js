//Lines 2 and 3 are the packages that we need in order to make our server. Express is the framework that we will be using to help build our server, cors allows us to recieve requests from other domains than our React application. Cors most important uses will be for external api's and allowing Postman to request your endpoints when testing them.
const express = require('express');
const cors = require('cors');

// Import your controller folder so you can use its handler functions.
const userCtrl = require('./controllers/userController');

// Line 9 creates an instance of express saved to the app variable so we can use its methods.
const app = express();

// Top Level Middleware: invoked every time the server recieves a request. Express.json parses the request from JSON to JavaScript. Cors is in Top Level Middleware so that it can ensure any request can be recieved, even if it's not from the same port as your server.
app.use(express.json());
app.use(cors());

// These are the endpoints for your users api. When creating an endpoint you first need to declare the method(get, post, put, or delete), then inside of the parenthesis, you first include the endpoint(it must include /api/), followed by what handler function it needs to run when that endpoint is requested. The handler functions are found in the controller file.
app.get('/api/users', userCtrl.getUsers);
app.post('/api/users', userCtrl.addUser);
app.put('/api/users/:id', userCtrl.updateUser);
app.delete('/api/users/:id', userCtrl.removeUser);


// app.listen allows our server to run and listen for requests. It firsts takes the port number you would like your server to run on, followed by a callback function that includes a console.log letting you know the server is running.
app.listen(3005, () => {
    console.log('Server Running!')
});