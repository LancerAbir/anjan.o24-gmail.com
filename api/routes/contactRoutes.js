/**
*! -*-*-*-*-*-*- Express Contact Router -*-*-*-*-*-*-
*/

// Express Router Import
const contactRouter = require('express').Router()

// import route controller
const contactController = require('../RouterController/contactRouterController')

// import authenticate JSON Web Token file
const authenticate = require('../verifyToken/authenticate')




// example.com/api/contact/ --> GET 
contactRouter.get('/', contactController.getAllContactController)

// example.com/api/contact/ --> POST
contactRouter.post('/', authenticate, contactController.postAllContactController)

// example.com/api/contact/postID --> View Single Contact Router
contactRouter.get('/:postID', contactController.singleContactController)

// example.com/api/contact/postID --> PUT
contactRouter.put('/:postID', authenticate, contactController.contactUpdateController)

// example.com/api/contact/postID --> DELETE
contactRouter.delete('/:postID', authenticate, contactController.contactDeleteController)

module.exports = contactRouter