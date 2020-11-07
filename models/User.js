const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	nickname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	dob: {
		type: Date,
	},
	gender: {
		type: String,
		enum: ["Male", "Female", "Other"]
	},
	adress: {
		type: String,
	},	
	city: {
		type: String,
	},
	postalcode: {
		type: Number,
	},
	country: {
		type: String,
	},
	personalwebsite: {
		type: String,
	},	
	fbprofile: {
		type: String,
	},	
	instagramprofile: {
		type: String,
	},	
	twitteraccount: {
		type: String,
	}
})

module.exports = mongoose.model("User", UserSchema);
