const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

// Models
const User = require("../models/user")

// Registration page
router.get("/register", (req, res) => {
	res.render("auth/register.ejs", {
		title: " — Sign Up",
	})
})

// Register route
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

// Login Page
router.get("/login", (req, res) => {
	res.render("auth/login.ejs", {
		title: " — Sign In"
	})
})

router.post("/login", async (req, res, next) => {
	try {
		const userToSignIn = await User.findOne({ email: req.body.email })
		if (userToSignIn) {
			const validLogin = bcrypt.compareSync(req.body.password, userToSignIn.password)
			if (validLogin) {
				req.session.user = userToSignIn
				req.session.message = `Welcome back, ${userToSignIn.username}!`
				res.redirect("/")
			} else {
				req.session.message = "Invalid email or password"
				res.redirect("/auth/login")
			}
		} else {
			req.session.message = "Invalid email or password"
			res.redirect("/auth/login")
		}
	} catch (err) {
		const d = new Date()
		console.error(`${d.toLocaleString()}: Error logging in user:`)
		console.error(err)
		next(err)
	}
})

module.exports = router