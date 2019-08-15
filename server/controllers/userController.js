// define user array
let users = [{id:1,name:'tayte',role:'admin'}];

// handler functions
const getUsers = (req, res) => {
    // send users array back
    res.status(200).send(users);
};

const addUser = (req, res) => {
    // take info from body of the req
    const {name, role} = req.body;
    // create an id for the new user with checks
    let id;

    if(users.length === 0){
        id = 1;
    } else {
        id = users[users.length - 1].id + 1
    };

    // create a new user obj
    const newUser = {
        id,
        name,
        role
    }
    // add to array
    users.push(newUser);
    // send response
    res.status(200).send(users)
};

const updateUser = (req, res) => {
    // take user if from params
    const {id} = req.params;
    // find user
    for(let i = 0; i < users.length; i++){
        if(users[i].id === +id){
            // check to see what role is
            if(users[i].role === 'admin'){
                users[i].role = 'user'
            } else {
                users[i].role = 'admin'
            }
        }
    }
    // return updated users
    res.status(200).send(users);
};

const removeUser = (req, res) => {
    // take user if from params
    const {id} = req.params;
    // filter out the user
    users = users.filter(user => {
        if(user.id !== +id) return user;
    })
    // send users back
    res.status(200).send(users);
};

// export handler functions
module.exports = {
    getUsers,
    addUser,
    updateUser,
    removeUser
};