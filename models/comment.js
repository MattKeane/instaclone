const mongoose = require("mongoose")
const User = require("./user")

const commentSchema = new mongoose.Schema({
	author: User,
	body: String,
	posted: {
		type: Date,
		default: Date.now,
	},
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment