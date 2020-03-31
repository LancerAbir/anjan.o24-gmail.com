// import User Model
const User = require('../models/userModel')

// import Bcrypt --> Password কে Hide করে # Tag Use করার জন্য
const bcrypt = require('bcrypt')

// import JSON Web Token
const jwt = require('jsonwebtoken')



// {GET Method} data show করার জন্য
const getAllUserController = (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json({
                message: 'All User JSON Data',
                users
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


// {POST Method} Login করার জন্য
const userLoginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({ email })
        .then(user => {
            if (user) {
                //user.password --> এই parameter database থেকে আইসে
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            message: 'Error Occurred'
                        })
                    }
                    /**
                    *! -*-*-*-*-*- result 2 ta rules flow করে (true or false) -*-*-*-*-*-
                    */
                    // its result = true ?
                    if (result) {
                        let token = jwt.sign({ email: user.email, _id: user._id }, 'SECRET_KEY', { expiresIn: '2h' })
                        res.json({
                            message: 'Login Successful',
                            token
                        })
                        // its result = false ?
                    } else {
                        res.json({
                            message: 'Login Failed, Password Doesn\'t Match'
                        })
                    }
                })
            } else (
                res.json({
                    message: 'User Not Found'
                })
            )
        })
}


// {POST Method} Register করার জন্য
const userRegisterController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => { // 10 --> salt-round {basically salt-round is 10}
        if (err) {
            res.status(500).json({
                message: 'Error Occurred',
                error: err
            })
        }

        let user = new User({
            email: req.body.email,
            password: hash
        })


        // mongo database এ user - users নামে save হবে
        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Create Successfully',
                    user_details: result,
                    original: req.body.password
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Error Occurred',
                    error
                })
            })

    })
}



module.exports = {
    getAllUserController,
    userLoginController,
    userRegisterController
}