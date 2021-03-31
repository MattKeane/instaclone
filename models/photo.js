const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema({
	image: {
		data: Buffer,
		contentType: String,
	},
	caption: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}],
	created: {
		type: Date,
		default: Date.now,
	},
})

const Photo = mongoose.model("Photo", photoSchema)

module.exports = Photo