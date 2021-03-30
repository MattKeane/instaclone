// NPM imports
const express = require("express")
const app = express()

// Environment variables
require("dotenv").config()
const PORT = process.env.PORT

// Connect to database
require("./db")

// Controllers
const authController = require("./controllers/authController")
app.use("/auth", authController)

// Home route
app.get("/", (req, res) => {
	res.send("Route works")
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