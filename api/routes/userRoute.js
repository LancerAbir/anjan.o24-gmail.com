/**
*! -*-*-*-*-*-*- Express User Router -*-*-*-*-*-*-
*/

// Express Router Import
const userRouter = require('express').Router()

// import route controller
const userController = require('../RouterController/userRouterController')

// import authenticate file
const authenticate = require('../middleware/authenticate')




// example.com/users/ --> GET 
userRouter.get('/', authenticate, userController.getAllUserController)

// example.com/users/login --> POST
userRouter.post('/login', userController.userLoginController)

// example.com/users/register --> POST
userRouter.post('/register', userController.userRegisterController)


module.exports = userRouter