//Project model
var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
	thumbnail: String,
	title: String,
	description: String,
	hasVisit: String,
	visit: String,
	hasGitHub: String,
	github: String
});

module.exports = mongoose.model("Project", projectSchema);