const mongoose = require("mongoose")
const Comment = require("./comment")
const User = require("./user")

const photoSchema = new mongoose.Schema({
	img: {
		data: Buffer,
		contentType: String,
	},
	caption: String,
	author: User,
	likes: [User],
	comments: [Comment],
	created: {
		type: Date,
		default: Date.now,
	},
})

const Photo = mongoose.model("Photo", photoSchema)

module.exports = Photo