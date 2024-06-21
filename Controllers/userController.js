const users = require('../Modals/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


// register user
exports.registerController = async (req,res)=>{
    console.log("Inside register");
    const {firstName,lastName,emailAddress,password,phoneNumber} = req.body
    console.log(firstName,lastName,emailAddress,password,phoneNumber);
    try {
        //check emailAddress is in mongodb user
        const existingUser = await  users.findOne({emailAddress})
        if (existingUser) {
            //if registered a user
            res.status(406).json("Account already exist,please login..")
        } else {
            // bcrpting password
            const encryptedPassword = await bcrypt.hash(password, 10);
            // register user: create object for your model
            const newUser = new users({
                firstName,lastName,emailAddress,password:encryptedPassword,phoneNumber
            })
            // update mongodb from model
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login user
exports.loginController = async (req,res)=>{
    console.log("inside login");
    const {emailAddress,password} = req.body
    console.log(emailAddress,password);
    try {
        const existingUser = await  users.findOne({emailAddress})
        if (existingUser) {
            // validating password
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                // token generator
                const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
                res.status(200).json({
                    user:existingUser,
                    token
                })
            }else {
                res.status(404).json("Invalid Email / Password...")
            }
        } else {
            res.status(404).json("User not found...")
        }
    } catch (error) {
        res.status(401).json(err)
    }
}

// all users
exports.allRegisteredUsersController = async (req,res)=>{
    console.log("Inside allRegisteredUsersController");
    
    try {
        const allRegisteredUsers = await users.find().select('-password')
        res.status(200).json(allRegisteredUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}

// user details.
exports.userDetailsController = async (req,res) => {
    console.log("Inside userDetailsController");
    const {uid} = req.params

    try {
        const userDetails = await users.findOne({_id:uid}).select('-password')
        await userDetails.save()
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}