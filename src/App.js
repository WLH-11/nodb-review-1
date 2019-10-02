//When building a class component, make sure to import {Component} or reference React.Component below
import React, {Component} from 'react';
import axios from 'axios';

// import components, include the file path as where it's being imported from
import User from './components/User/User';

// import style sheet, including reset-css if you decide to add it
import 'reset-css';
import './App.css';

//If you didn't import {Component} at the top, type class App extends React.Component
class App extends Component {
  constructor(){
    super();

    this.state = {
      users: [],
      name: '',
      role: ''
    };
  };

  // Lifecycle Methods
  componentDidMount(){
    //componentDidMount will fire as soon as render initially fires(when JSX displays on the screen for the first time), which will then fire any functionality inside of it. In this case, it will invoke the getUsers method.
    this.getUsers();
  };

  // Methods
  getUsers = () => {
    //getUsers uses axios to hit the /api/users endpoint in the server, and then sets the state of users to the response it recieves from the server. If there is an error, the catch block will console log what that error is.
    axios.get('/api/users')
      .then(response => {
        this.setState({
          users: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addUser = (event) => {
    //addUser is a function that creates a user object(body, seen below) with a name and a role property. This is sent down to the server as a req.body object to the /api/users endpoint, and the server uses that to create a user. The server then sends back the new list of users, including the newly created user, which then gets set to the components state for users.  The inputs for name and role are also cleared out for their next use.

    // prevent default form submission
    event.preventDefault();
    // create body of req
    const body = {
      name: this.state.name,
      role: this.state.role
    }
    // make http post req
    axios.post('/api/users', body)
      .then(response => {
        this.setState({
          users: response.data,
          name: '',
          role: ''
        })
      })
      .catch(error => {
        console.log(error)
      })
  };

  deleteUser = (id) => {
    //deleteUser handles the deleting of a user by using the users id, which is passed into the function. That id is used in the endpoint below as a parameter(req.params) and sent to the server. The server deletes the user with that id, and then sends back the updated users array, which is then set to state.
    axios.delete(`/api/users/${id}`)
      .then(response => {
        this.setState({
          users: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  updateRole = (id) => {
    //updateRole is the function that handles updating a users object. Every user in this app has a role, and this function changes the role. This function takes an id as an argument, and then sends it to the server to update the user. The new user array is then sent up and set to state.
    axios.put(`/api/users/${id}`)
      .then(response => {
        this.setState({
          users: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render(){
    // Map through users and display them
    const mappedUsers = this.state.users.map(user => {
      // Pass user object as props to User component
      // The User component handles the displaying of each user object passed into it
      return <User user={user} updateRole={this.updateRole} deleteUser={this.deleteUser}/>
    });

    return (
      <div className="app-container">
        <nav className="dashboard-banner">
          <h1>User Managment Platform</h1>
        </nav>
        <div className="dashboard-container">
          <form className="new-user-container">
            <label>Name</label>
            <input type="text" value={this.state.name}onChange={(e) => this.setState({name: e.target.value})}/>
            <label>Role</label>
            <input type="text" value={this.state.role} onChange={(e) => this.setState({role: e.target.value})}/>
            <button onClick={this.addUser}>Add User</button>
          </form>
          <div className="users-container-header">
            <p>ID</p>
            <p>User</p>
            <p>Role</p>
            <p>Remove</p>
          </div>
          <div className="users-container">
            {/* The mapped users will display in this container */}
            {mappedUsers}
          </div>
        </div>
      </div>
    )
  }
};

//make sure to export your component, so it's accessible to other parts of the application
export default App;