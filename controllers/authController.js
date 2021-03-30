const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

// Models
const User = require("../models/user")

router.get("/register", (req, res) => {
	res.render("auth/register.ejs", {
		title: " — Sign Up",
	})
})

router.post("/register", async (req, res, next) => {
	try {
		if (req.body.password === req.body.verifyPassword) {
			const checkUsername = await User.findOne({ username: req.body.username})
			const checkEmail = await User.findOne({ email: req.body.email })
			if (checkUsername) {
				// TO DO: Add flash messaging
				res.redirect("/")
			} else if (checkEmail) {
				// TO DO: Add flash messaging
				res.redirect("/")
			} else {
				const salt = bcrypt.genSaltSync(10)
				req.body.password = bcrypt.hashSync(req.body.password, salt)
				const createdUser = await User.create(req.body)
				// TO DO: add sessions
				// TO DO: add flash messaging
				const d = new Date()
				console.log(`${d.toLocaleString()}: User created:`)
				console.log(createdUser)
				res.send("User created")
			}
		} else {
			// TO DO: Add flash messaging
			res.redirect("/")
		}
	} catch (err) {
		const d = new Date()
		console.error(`${d.toLocaleString()}: Error creating account:`)
		console.error(err)
		next(err)
	}
})

module.exports = router