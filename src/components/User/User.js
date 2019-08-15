import React from 'react';
import * as Icon from 'react-feather';

// import style sheets
import './User.css';

function User(props) {
    // take items from props
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