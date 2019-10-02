import React from 'react';
//React feather is a package that provides pre-built icons, not required for the project
import * as Icon from 'react-feather';

// import style sheets
import './User.css';

function User(props) {
    //Line 10 shows destructuring of props that were passed by App.js. Destructuring allows us to reference id, name, and role as if they were variables.
    const {id, name, role} = props.user;
    return (
        <div className="user-container">
            <p>{id}</p>
            <p>{name}</p>
            <p id="cursor" onClick={() => props.updateRole(id)}>{role}</p>
            <Icon.Trash id="cursor" size={20} onClick={() => props.deleteUser(id)}/>
        </div>
    )
}

export default User;