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
router.get("/", requireLogin, async (req, res, next) => {
	try {
		const allPhotos = await Photo.find({})
		res.render("photos/home.ejs", {
			photos: allPhotos,
		})
	} catch (err) {
		const d = new Date()
		console.error(`${d.toLocaleString()}: Error with photo home page:`)
		console.error(err)
		next(err)
	}
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

// Photo serving route
router.get("/:id/img", async (req, res, next) => {
	try {
		const photoToSend = await Photo.findById(req.params.id)
		res.set("Content-Type", photoToSend.image.contentType)
		res.send(photoToSend.image.data)
	} catch (err) {
		const d = new Date()
		console.error(`${d.toLocaleString()}: Error serving photo:`)
		console.error(err)
		next(err)
	}
})

module.exports = router