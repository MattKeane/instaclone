// NPM imports
const express = require("express")
const app = express()
const bodyParser = require("body-parser")

// Environment variables
require("dotenv").config()
const PORT = process.env.PORT

// Connect to database
require("./db")

// Middleware
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

// Controllers
const authController = require("./controllers/authController")
app.use("/auth", authController)

// Home route
app.get("/", (req, res) => {
	res.redirect("/auth/register")
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