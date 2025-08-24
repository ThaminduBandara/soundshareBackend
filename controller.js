
const User = require('./model');




const getUsers =(req, res, next) => {

    User.find()
        .then(response => {
            res.json({response});
        })
        .catch(error => {
            res.json({error})
        }); 
       
};

const addUser = (req, res, next) => {

    const user = new User({

        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        bio: req.body.bio,
        
    });
    user.save()
        .then(response => {
            res.json({response});
        })
        .catch(error => {
             res.json({error})
        }); 


}


const updateUser = (req, res, next) => {

    const { id, name, email, password, profilePicture, bio } = req.body;
    User.updateOne({id: id}, {$set: {name: name, email: email, password: password, profilePicture: profilePicture, bio: bio}})
              .then(response => {
            res.json({response});
        })
        .catch(error => {
             res.json({error})
        }); 
}

const deleteUser = (req, res, next) => {

    const  id  = req.body.id;
    User.deleteOne({id: id})
        .then(response => {
            res.json({response});
        })
        .catch(error => {
             res.json({error})
        }); 
}



exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;