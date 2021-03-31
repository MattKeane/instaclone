const express = require("express")
const router = express.Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage })
const Photo = require("../models/photo")

// Middleware
router.use((req, res, next) => {
	res.locals.title = " — Photos"
	next()
})

const requireLogin = (req, res, next) => {
	if (!req.session.user) {
		req.session.message = "You must be logged in to do that"
		res.redirect("/auth/login")
	} else {
		next()
	}
}

// Photo homepage
router.get("/", requireLogin, (req, res) => {
	res.render("photos/home.ejs")
})

// New photo page
router.get("/new", requireLogin, (req, res) => {
	res.render("photos/new.ejs")
})

// Create photo route
router.post("/new", upload.single("image"), async (req, res, next) => {
	try {
		const createdPhoto = await Photo.create({
			caption: req.body.caption,
			author: req.session.user._id,
			image: {
				data: req.file.buffer,
				contentType: req.file.mimetype,
			},
		})
		const d = new Date()
		console.log(`${d.toLocaleString}: New photo created:`)
		console.log(createdPhoto)
		res.redirect("/photos")
	} catch (err) {
		const d = new Date()
		console.error(`${d.toLocaleString()}: Error creating new photo:`)
		console.error(err)
		next(err)
	}
})

module.exports = router