const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})

mongoose.connection.on("connected", () => {
	const d = new Date()
	console.log(`${d.toLocaleString()}: Connected to database`)
})

mongoose.connection.on("disconnected", () => {
	console.log(`${d.toLocaleString()}: Disconnected from database`)
})

mongoose.connection.on("error", err => {
	const d = new Date()
	console.error(`${d.toLocaleString()}: Error with database connection:`)
	console.error(err)
})