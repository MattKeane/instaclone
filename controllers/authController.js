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
				req.session.message = "Username already taken"
				res.redirect("/auth/register")
			} else if (checkEmail) {
				req.session.message = "Email address already used"
				res.redirect("/auth/register")
			} else {
				const salt = bcrypt.genSaltSync(10)
				req.body.password = bcrypt.hashSync(req.body.password, salt)
				const createdUser = await User.create(req.body)
				req.session.user = createdUser
				req.session.message = `Thank you for signing up, ${createdUser.username}!`
				const d = new Date()
				console.log(`${d.toLocaleString()}: User created:`)
				console.log(createdUser)
				res.redirect("/")
			}
		} else {
			req.session.message = "Passwords must match!"
			res.redirect("/auth/register")
		}
	} catch (err) {
		const d = new Date()
		console.error(`${d.toLocaleString()}: Error creating account:`)
		console.error(err)
		next(err)
	}
})

module.exports = router