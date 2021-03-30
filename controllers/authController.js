const express = require("express")
const router = express.Router()

router.get("/register", (req, res) => {
	res.render("auth/register.ejs", {
		title: " — Sign Up",
	})
})

router.post("/register", async (req, res, next) => {
	console.log(req.body)
	res.redirect("/")
})

module.exports = router