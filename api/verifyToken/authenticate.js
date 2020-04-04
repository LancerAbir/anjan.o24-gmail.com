/**
*! -*-*-*-*-*-*- JSON Web Token Verification -*-*-*-*-*-*-
*/

// Import JSON Web Token
const jwt = require('jsonwebtoken')



const authenticate = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'SECRET_KEY')

        req.user = decode
        next()

    } catch (error) {
        res.status(500).json({
            message: 'Authentication Failed',
            error
        })
    }
}

module.exports = authenticate

