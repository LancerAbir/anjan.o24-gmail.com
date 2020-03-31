//import Contact Model
const Contact = require('../models/contactModel')



// {GET Method} data show করার জন্য
const getAllContactController = (req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json({
                message: 'All Contact JSON Data',
                contacts
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occurred',
                error: err
            })
        })
}


// {POST Method} mongo database এ data store করার জন্য
const postAllContactController = (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    // mongo database এ contact - contacts নামে save হবে
    contact.save()
        .then(data => {
            res.status(201).json({
                message: 'Contact Data Added',
                contact: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occurred',
                error: err
            })
        })
}

// single controller
const singleContactController = (req, res, next) => {
    let id = req.params.postID

    Contact.findById(id)
        .then(contact => {
            res.status(200).json({
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occurred',
                error: err
            })
        })
}


// {PUT Method} mongo database এ data update/edit করার জন্য
const contactUpdateController = (req, res, next) => {
    let id = req.params.postID

    let updatedContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    Contact.findByIdAndUpdate(id, { $set: updatedContact })
        .then(contact => {
            res.json({
                message: 'Updated is Successful',
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occurred',
                error: err
            })
        })
}


// {DELETE Method} mongo database এ data delete করার জন্য
const contactDeleteController = (req, res, next) => {
    let id = req.params.postID

    Contact.findByIdAndRemove(id)
        .then(result => {
            res.json({
                message: 'Contact is Delete Successful',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occurred',
                error: err
            })
        })
}


module.exports = {
    getAllContactController,
    postAllContactController,
    singleContactController,
    contactUpdateController,
    contactDeleteController
}