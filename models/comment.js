const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	body: String,
	posted: {
		type: Date,
		default: Date.now,
	},
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment