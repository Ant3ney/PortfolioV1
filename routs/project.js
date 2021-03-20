//project routs
var utilities = require("../middleware/utilities");
var Project = require("../models/project");

module.exports = (router) => {
	router.get("/project/new", (req, res) => {
		res.render("projects/new");
	});

	//show project of id
	router.get("/project/:id", (req, res) => {
		var id = req.params.id;
		res.render("projects/show");
	});
	
	router.post("/project", (req, res) => {
		var newProject = utilities.assembleProject(req);
		
		Project.create(newProject, (err, project) => {
			if(err){
				console.log("Something went wrong");
				console.log(err.message);
			}
			else{
				res.redirect("/");
			}
		});
	});
	
	//Show edit page
	router.get("/project/:id/edit", (req, res) => {
		var id = req.params.id;
		
		Project.findById(id, (err, project) => {
			if(err){
				console.log("Something went wrong");
				console.log(err.message);
			}
			else{
				res.render("projects/edit", {project: project});
			}
		});
	});
	
	router.put("/project/:id", (req, res) => {
		var id = req.params.id;
		
		var updatedProject = utilities.assembleProject(req);
		Project.findByIdAndUpdate(id, updatedProject, (err, project) => {
			if(err){
				console.log("Something went wrong");
				console.log(err.message);
			}
			else{
				res.redirect("/");
			}
		});
	});
	
	router.delete("/project/:id", (req, res) => {
		var id = req.params.id;
		
		Project.findByIdAndRemove(id, (err, project) => {
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