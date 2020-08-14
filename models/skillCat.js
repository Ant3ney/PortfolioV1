var mongoose = require("mongoose");

var skillCatSchema = new mongoose.Schema({
	category: String,
	skill: [String]
});

module.exports = mongoose.model("SkillCat", skillCatSchema);