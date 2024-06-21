const express = require('express')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')


const router = new express.Router()

// register 
router.post('/register',userController.registerController)

// login 
router.post('/login',userController.loginController)

// all users
router.get('/all-users',jwtMiddleware,userController.allRegisteredUsersController)

// view user
router.get('/users/:uid',jwtMiddleware,userController.userDetailsController);


module.exports = router