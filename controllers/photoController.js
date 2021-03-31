const express = require("express")
const router = express.Router()

// Middleware
router.use((req, res, next) => {
	res.locals.title = " — Photos"
	next()
})

// Photo homepage
router.get("/", (req, res) => {
	if (req.session.user) {
		res.render("photos/home.ejs")
	} else {
		req.message = "You must be signed in to add a photo"
		res.redirect("/auth/login")
	}
	
})

// New photo page
router.get("/new", (req, res) => {
	res.render("photos/new.ejs")
})

module.exports = router