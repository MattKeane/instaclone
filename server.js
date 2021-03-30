// NPM imports
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")

// Environment variables
require("dotenv").config()
const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET

// Connect to database
require("./db")

// Middleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
}))

app.use((req, res, next) => {
	res.locals.currentUser = req.session.user
	next()
})

// Controllers
const authController = require("./controllers/authController")
app.use("/auth", authController)

// Home route
app.get("/", (req, res) => {
	if (req.session.user) {
		res.render("home.ejs", {
			title: " — Home"
		})
	} else {
		res.redirect("/auth/register")
	}
})

// 404 route
app.get("*", (req, res) => {
	res.render("404.ejs", {
		title: " — 404: File Not Found"
	})
})

// Setting up app to listen
app.listen(PORT, err => {
	const d = new Date()
	if (err) {
		console.error(`${d.toLocaleString()}: Error attempting to listen on Port ${PORT}:`)
		console.error(err)
	} else {
		console.log(`${d.toLocaleString()}: Connected on Port ${PORT}`)
	}
})