/**
 *! -*-*-*-*-*-*- Import Modules Function & File Start -*-*-*-*-*-*-
 */

// import express
const express = require("express");

// import Mongoose
const mongoose = require("mongoose");

// import cors {third party modules --> 2/একাধিক server কে request করার system হল cors }
const cors = require("cors");

// import User Route file
const userRouter = require("./api/routes/userRoute");

// import Contact Route file
const contactRouter = require("./api/routes/contactRoutes");

// express define in app variable
const app = express();

// no third-party body parser needed express have builtin bodyparser
app.use(express.json());

/**
//* -*-*-*-*-*-*- Import Modules Function & File End -*-*-*-*-*-*-
*/

/**
 *! -*-*-*-*-*-*-*-*-*- Mongoose Start -*-*-*-*-*-*-*-*-*-
 */

// Mongoose connection {dede-db --> database name}
mongoose.connect(
	"mongodb://localhost/contact-db",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Database Connection Established");
	}
);

app.use(express.json());

/**
 *! -*-*-*-*-*-*-*-*-*- Third Party Modules (Cors) Start -*-*-*-*-*-*-*-*-*-
 */
// Cors Modules
app.use(cors());
/**
//* -*-*-*-*-*-*-*-*-*- Third Party Modules (Cors) End -*-*-*-*-*-*-*-*-*-
*/

/**
 *! -*-*-*-*-*-*-*-*-*- api Directory Route/Path Start -*-*-*-*-*-*-*-*-*-
 */
// example.com/api/users --> path add in other file
app.use("/api/users", userRouter);
// example.com/api/contact --> path add in other file
app.use("/api/contact", contactRouter);
/**
//* -*-*-*-*-*-*-*-*-*- api Directory Route/Path End -*-*-*-*-*-*-*-*-*-
*/

/**
 *! -*-*-*-*-*-*-*-*-*- Home Directory Route/Path Start -*-*-*-*-*-*-*-*-*-
 */
app.get("/about", (req, res) => {
	res.send(`<h1>HELLO this is about page</h1>`);
});

app.get("/contact", (req, res) => {
	res.send(`<h1>HELLO this is contact page</h1>`);
});

app.get("/blog", (req, res) => {
	res.json({
		message: "this is json data come form blog page",
	});
});

app.get("/", (req, res) => {
	res.send(`<h1>HELLO this is HOME page</h1>`);
});

app.get("*", (req, res) => {
	res.send(`<h1> this is 404 ERROR page</h1>`);
});
/**
//* -*-*-*-*-*-*-*-*-*- Home Directory Route/Path End -*-*-*-*-*-*-*-*-*-
*/

/**
 *! -*-*-*-*-*-*-*-*-*- process.env --> কোন environment / লিংক এ ওপেন হবে তা বোঝায় -*-*-*-*-*-*-*-*-*-
 */
const PORT = process.env.PORT || 3030;

/**
 *! app.listen --> PORT
 */
app.listen(PORT, () => {
	console.log(`Server is Running on PORT ${PORT}`);
});
