import React, {Component} from 'react';
import axios from 'axios';

// import components
import User from './components/User/User';

// import style sheet
import 'reset-css';
import './App.css';

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
    this.getUsers();
  };

  // Methods
  getUsers = () => {
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
  };

  deleteUser = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(response => {
        this.setState({
          users: response.data
        })
      })
  }

  updateRole = (id) => {
    axios.put(`/api/users/${id}`)
      .then(response => {
        this.setState({
          users: response.data
        })
      })
  }

  render(){
    // map through users and display them
    const mappedUsers = this.state.users.map(user => {
      // pass user object as props to User component
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
            {mappedUsers}
          </div>
        </div>
      </div>
    )
  }
};

export default App;
