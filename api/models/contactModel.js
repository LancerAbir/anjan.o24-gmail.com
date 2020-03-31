// mongoose import
const mongoose = require('mongoose');

// validator import --> Schema কে Validate করার জন্য
const validator = require('validator');


// Mongoose Schema
const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        minlength: 8,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: `{VALUE} is not correct email`
        }
    }
})


// Mongoose Model {Contact নামে database save হবে}
const ContactModel = mongoose.model('Contact', contactSchema)

module.exports = ContactModel