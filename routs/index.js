//index routs
var express = require('express');
var router = express.Router();
var skillsRoute = require('./skill');
var projectsRoute = require('./project');
var SkillCat = require('../models/skillCat');
var Project = require('../models/project');
const Experience = require('../models/experience');
const sendmail = require('sendmail')();
const fetch = require('node-fetch');

//Adding routs
skillsRoute(router);
projectsRoute(router);

//Show landing page
router.get('/', (req, res) => {
	Promise.all([SkillCat.find({}), Project.find({}), Experience.find({})])
		.then(dbEntries => {
			let skillCat = dbEntries[0];
			let projects = dbEntries[1];
			let experiences = dbEntries[2];
			res.render('index', {
				skillCats: skillCat,
				projects: projects,
				experiences: experiences,
				settings: {
					startShowingAll: false,
				},
			});
		})
		.catch(err => {
			res.status(500).send(`failed to load index page becaiuse ${err.message}`);
		});
});

router.post('/contactMe', (req, res) => {
	let emailServerOrgin = 'https://mail-server-system.herokuapp.com';
	let fromEmail = req.body.email.toString() || 'un specified email';
	var message = `${req.body.message.toString()}\nFrom: ${fromEmail}`;

	if (process.env.PRODUCTION === 'dev') {
		emailServerOrgin = 'http://localhost:3002';
	}
	let body = JSON.stringify({
		message: message,
		from: fromEmail,
		subject: 'Portfolio Mail',
	});

	console.log(`sending to : ${emailServerOrgin}/sendMail`);

	fetch(`${emailServerOrgin}/sendMail`, {
		method: 'post',
		body: body,
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => {
			return res.json();
		})
		.then(status => {
			console.log(status);
			if (status && !status.message && status.message !== 'sucessfull') {
				console.log('Email failed');
				res.redirect('/failedEmail');
			} else {
				console.log('Email was sucessfull');
				res.redirect('/sucessfullEmail');
			}
		})
		.catch(err => {
			console.error('Faild to send email');
			console.error(err);
			res.redirect('/failedEmail');
		});
});

router.get('/sucessfullEmail', (req, res) => {
	req.flash('authentication', 'You have sucessfully sent me an email');
	res.redirect('/');
});

router.get('/failedEmail', (req, res) => {
	req.flash('error', 'Email failed to send');
	res.redirect('/');
});

router.get('/download', (req, res) => {
	res.download(__dirname + '/../downloads/ResumeAnthonyCavuotifullstackwebdeveloper.pdf');
});

module.exports = router;
