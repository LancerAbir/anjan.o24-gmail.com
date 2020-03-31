/**
*! -*-*-*-*-*-*- Express Contact Router -*-*-*-*-*-*-
*/

// Express Router Import
const contactRouter = require('express').Router()

// import route controller
const contactController = require('../RouterController/contactRouterController')

// import authenticate file
const authenticate = require('../middleware/authenticate')




// example.com/contact/ --> GET 
contactRouter.get('/', contactController.getAllContactController)

// example.com/contact/ --> POST
contactRouter.post('/', authenticate, contactController.postAllContactController)

// example.com/contact/postID --> View Single Contact Router
contactRouter.get('/:postID', contactController.singleContactController)

// example.com/contact/postID --> PUT
contactRouter.put('/:postID', authenticate, contactController.contactUpdateController)

// example.com/contact/postID --> DELETE
contactRouter.delete('/:postID', authenticate, contactController.contactDeleteController)

module.exports = contactRouter