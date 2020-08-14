//index routs
var express = require("express");
var router = express.Router();
var skillsRoute = require("./skill");
var projectsRoute = require("./project");
var SkillCat = require("../models/skillCat");
var Project = require("../models/project");
const sendmail = require('sendmail')();

//Adding routs
skillsRoute(router);
projectsRoute(router);

//Show landing page
router.get("/", (req, res) => {
	
	//Add skills to index locals
	SkillCat.find({}, (err, skillCat) => {
		if(err){
			console.log("Something went wrong");
			console.log(err.message);
		}
		else{
			Project.find({}, (err, projects) => {
				if(err){
					console.log("Something went wrong");
					console.log(err.message);
				}
				else{
					res.render("index", {skillCats: skillCat, projects: projects});
				}
			});
		}
	});
});

router.post("/contactMe", (req, res) => {
	var message = req.body.message.toString() + "\n" + "From: " + req.body.email.toString();
	 sendmail({
			from: 'portfoliomail@gmail.com',
			to: 'anthonycavuoti@gmail.com',
			subject: 'JOB OPPORTUNITY LOOK HERE',
			html: message,
		  	}, function(err, reply) {
				console.log(err && err.stack);
				console.dir(reply);
		 		res.redirect("/");
		});
});

//test send file
router.get("/download", (req, res) => {
	res.download(__dirname + "/../downloads/M191-Sum20-Quiz1.pdf");	
});

module.exports = router;