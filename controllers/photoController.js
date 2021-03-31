const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
	res.render("photos/home.ejs", {
		title: " — Photos",
	})
})

router.get("/new", (req, res) => {
	res.render("photos/new.ejs", {
		title: " — Photos"
	})
})

module.exports = router