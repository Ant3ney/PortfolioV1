//index routs
var express = require("express");
var router = express.Router();
var skillsRoute = require("./skill");
var projectsRoute = require("./project");
var SkillCat = require("../models/skillCat");
var Project = require("../models/project");
const Experience = require('../models/experience');
const sendmail = require('sendmail')();

//Adding routs
skillsRoute(router);
projectsRoute(router);

//Show landing page
router.get("/", (req, res) => {
	
	Promise.all([
		SkillCat.find({}),
		Project.find({}),
		Experience.find({})
	])
	.then(dbEntries => {
		let skillCat = dbEntries[0];
		let projects = dbEntries[1];
		let experiences = dbEntries[2];
		res.render("index", {skillCats: skillCat, projects: projects, experiences: experiences, settings: {
			startShowingAll: false
		}});
	})
	.catch(err => {
		res.status(500).send(`failed to load index page becaiuse ${err.message}`);
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
	res.download(__dirname + "/../downloads/ResumeAnthonyCavuotifullstackwebdeveloper.pdf");	
});

module.exports = router;