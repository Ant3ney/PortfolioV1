//Experience model
var mongoose = require("mongoose");

var experienceSchema = new mongoose.Schema({
	thumbnail: String,
	conpanyName: String,
	details: [String],
	jobTitle: String,
	description: String,
	hasVisit: String,
	visit: String,
	hasGitHub: String,
	github: String,
	skill: [String]
});

module.exports = mongoose.model("Experience", experienceSchema);