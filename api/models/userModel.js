// mongoose import
const mongoose = require('mongoose');

// validator import
const valid = require('validator');



// Mongoose Schema
const Schema = mongoose.Schema
const userSchema = new Schema({

    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not correct email`
        }
    },
    password: {
        type: String
    }
})


// Mongoose Model {User নামে database save হবে}
const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel