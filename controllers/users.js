
const Users = require('../models/userModel');

const getUsers = async (req, res, next) => {

    try{
        const users = await Users.find();

        res.status(200).json(users);

    }catch (error){

        res.status(404).json({ message: error.message});
    } 
};


const createUser = async (req, res, next) => {

    const user = req.body;

    const newUser = new Users(user);

    try{
       await newUser.save(); 

       res.status(201).json(newUser);

    }catch(error){
        res.status(409).json({message:error.message});

    }
}

exports.getUsers = getUsers;
exports.createUser = createUser;