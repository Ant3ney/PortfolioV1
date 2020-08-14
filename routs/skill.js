//Skill route
var SkillCat = require("../models/skillCat");
var utilities = require("../middleware/utilities");

module.exports = (router) => {
	//show create skill category page
	router.get("/skill/new", (req, res) => {
		res.render("skillCat/new");
	});
	
	//create new skill category
	router.post("/skill", (req, res) => {
		var newSkillCat = utilities.assembleSkillCat(req);
		SkillCat.create(newSkillCat, (err, skillCat) => {
			if(err){
				console.log("something went wrong");
				console.log(err.message);
			}
			else{
				console.log("new skill category was created");
				console.log(skillCat);
				res.redirect("/");
			}
		});
	});
	
	//Show edit page
	router.get("/skill/:id/edit", (req, res) => {
		var id = req.params.id;
		SkillCat.findById(id, (err, skillCat) => {
			if(err){
				console.log("Something went wrong");
				console.log(err.message);
			}
			else{
				res.render("skillCat/edit", {skillCat: skillCat});
			}
		});
	});
	
	//update skill category
	router.put("/skill/:id", (req, res) => {
		var updatedSkillCat = utilities.assembleSkillCat(req);
		var id = req.params.id;
		
		SkillCat.findByIdAndUpdate(id, updatedSkillCat, (err, skillCat) => {
			if(err){
				console.log("Something went wrong");
				console.log(err.message);
			}
			else{
				res.redirect("/");
			}
		});
	});
	
	//Delete skill category
	router.delete("/skill/:id", (req, res) => {
		var id = req.params.id;
		SkillCat.findByIdAndRemove(id, (err, skillCat) => {
			if(err){
				console.log("Something went wrong");
				console.log(err.message);
			}
			else{
				res.redirect("/");
			}
		});
	});
}