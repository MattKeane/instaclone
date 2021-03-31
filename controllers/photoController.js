const express = require("express")
const router = express.Router()

// Middleware
router.use((req, res, next) => {
	res.locals.title = " — Photos"
	next()
})

// Photo homepage
router.get("/", (req, res) => {
	res.render("photos/home.ejs")
})

// New photo page
router.get("/new", (req, res) => {
	res.render("photos/new.ejs")
})

module.exports = router