// The users array is the data for our api. It contains different user objects with properties of id, name, and role.
let users = [
    {id: 1,
     name: 'Tayte',
     role: 'admin'},
    {id: 2,
     name: 'Matt',
     role: 'admin'}
];

//module.exports is an object that will include your handler functions. The handler functions NEED to be in your module.exports so that they can be imported and used in your index.js.
module.exports = {
    // handler functions
    getUsers = (req, res) => {
        // getUsers sends the entire user array back to the client side(our React front-end). The res(response) object has built in methods, we are using status to send a status code, and send to send our data.
        res.status(200).send(users);
    },
    
    addUser = (req, res) => {
        // addUser destructures the name and role from the req.body object(seen in App.js). An id is declared so that we can attach it to our new user object.
        const {name, role} = req.body;

        let id;

        // We then have an if statement. The reason for this is to know which id to attach to our object by seeing if there are currently in objects in the users array. If there aren't, the id is set to 1, if there are the id is set to one higher than the id of the last object in the array.
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
        
        // The new object is then pushed to our users array and sent back to the front-end.
        users.push(newUser);
        
        res.status(200).send(users)
    },
    updateUser = (req, res) => {
        // updateUser destructures the passed parameter from req.params. Remember that params name(in this case 'id', is defined when creating the endpoint in index.js.)
        const {id} = req.params;
        
        // this for loop is used to find the user with the same id as the one passed in with params. When it finds that user, it toggles their role from admin to user or from user to admin. You could also use the array methods 'find' or 'findIndex' to find the user.
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
    },
    removeUser = (req, res) => {
        // removeUser destructures the id passed in from req.params.
        const {id} = req.params;
        // Below, we are reassigning the value of users to itself filtering out the user with the same id as the one passed in. You could also remove the user using a combination of 'findIndex' and 'splice'.
        users = users.filter(user => {
            if(user.id !== +id) return user;
        })
        // Send users back
        res.status(200).send(users);
    }
}