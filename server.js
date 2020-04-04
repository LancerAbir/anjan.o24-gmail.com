/**
*! -*-*-*-*-*-*- Import Modules Function & File Start -*-*-*-*-*-*-
*/

// import express
const express = require('express');

// import User Route file
const userRouter = require('./api/routes/userRoute')

// import Contact Route file
const contactRouter = require('./api/routes/contactRoutes')

// import bodyParser {third party modules --> data pass করার জন্য use হয়}
const bodyParser = require('body-parser')

// import cors {third party modules --> 2/একাধিক server কে request করার system হল cors }
const cors = require('cors')
/**
//* -*-*-*-*-*-*- Import Modules Function & File End -*-*-*-*-*-*-
*/



/**
*! -*-*-*-*-*-*-*-*-*- Mongoose Start -*-*-*-*-*-*-*-*-*-
*/
// import Mongoose
const mongoose = require('mongoose');
// Mongoose connection {dede-db --> database name}
mongoose.connect('mongodb://localhost/contact-db');

// check Mongoose connection is or not ?
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Database Connection Established');
})
/**
//* -*-*-*-*-*-*-*-*-*- Mongoose End -*-*-*-*-*-*-*-*-*-
*/



// express define in app variable 
const app = express()


/**
*! -*-*-*-*-*-*-*-*-*- Third Party Modules (BodyParser) Start -*-*-*-*-*-*-*-*-*-
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
/**
//* -*-*-*-*-*-*-*-*-*- Third Party Modules (BodyParser) End -*-*-*-*-*-*-*-*-*-


/**
*! -*-*-*-*-*-*-*-*-*- Third Party Modules (Cors) Start -*-*-*-*-*-*-*-*-*-
*/
// Cors Modules
app.use(cors())
/**
//* -*-*-*-*-*-*-*-*-*- Third Party Modules (Cors) End -*-*-*-*-*-*-*-*-*-
*/


/**
*! -*-*-*-*-*-*-*-*-*- api Directory Route/Path Start -*-*-*-*-*-*-*-*-*-
*/
// example.com/api/users --> path add in other file
app.use('/api/users', userRouter)
// example.com/api/contact --> path add in other file
app.use('/api/contact', contactRouter)
/**
//* -*-*-*-*-*-*-*-*-*- api Directory Route/Path End -*-*-*-*-*-*-*-*-*-
*/


/**
*! -*-*-*-*-*-*-*-*-*- process.env --> কোন environment / লিংক এ ওপেন হবে তা বোঝায় -*-*-*-*-*-*-*-*-*-
*/
const PORT = process.env.PORT || 3030



/**
*! -*-*-*-*-*-*-*-*-*- Home Directory Route/Path Start -*-*-*-*-*-*-*-*-*-
*/
app.get('/about', (req, res) => {
    res.send(`<h1>HELLO this is about page</h1>`)
})

app.get('/contact', (req, res) => {
    res.send(`<h1>HELLO this is contact page</h1>`)
})

app.get('/blog', (req, res) => {
    res.json({
        message: "this is json data come form blog page"
    })
})

app.get('/', (req, res) => {
    res.send(`<h1>HELLO this is HOME page</h1>`)
})

app.get('*', (req, res) => {
    res.send(`<h1> this is 404 ERROR page</h1>`)
})
/**
//* -*-*-*-*-*-*-*-*-*- Home Directory Route/Path End -*-*-*-*-*-*-*-*-*-
*/


/**
*! app.listen --> PORT 
*/
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
})