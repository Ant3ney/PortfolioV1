//Experience routs
let express = require("express");
let router = express.Router();
var utilities = require("../middleware/utilities");
let Experience = require('../models/experience');

router.get('/new', (req, res) =>{
    res.status(200).render('experience/new', {settings: {
        title: 'Add experience',
        type: 'addExperience'
    }});
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    Experience.findById(id)
    .then(experience => {
        res.render('experience/show', experience);
    });
});

router.get('/:id/edit', (req, res) => {
    let id = req.params.id;
    Experience.findById(id)
    .then(experience => {
        console.log(experience);
        res.status(200).render('experience/new', {experience: experience, settings: {
            title: 'Edit  experience',
            type: 'editExperience'
        }});
    })
    .catch(err => {
        let message = 'Something went wrong in edit experience route because ' + err.message;
        console.error(message);
        res.status(500).json({
            message: message
        });
    });
    
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let replacementExperience = utilities.assembleExperience(req);

    Experience.findByIdAndUpdate(id, replacementExperience)
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        res.json(err);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Experience.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.json(err);
    });
});

router.get('/testTheLatestAndGreatest', (req, res) => {
    Experience.remove({})
    .then(() => {
        res.send('ok');
    });
    /*.then(() => {
        Experience.create([
            {
                thumbnail: 'https://serene-williams-bb8bee.netlify.app/images/Portfolieo/Senpa.jpg',
                conpanyName: 'Senpa.io',
                details: [
                    'Built views that expanded the apps functionality and appeal',
                    'Utilized HTML, CSS, and Javascript to convert designs from sketch to Webpack.',
                    'Released update to over 2,000 people.'
                ],
                jobTitle: 'React / Webpack Developer',
                description: 'I worked on this app/site',
                hasVisit: 'true',
                visit: 'https://senpa.io/',
                hasGitHub: 'false',
                github: '',
                skill: [
                    'React native',
                    'Webpack',
                    'Javascript',
                    'HTML',
                    'CSS',
                    'UI',
                    'UX',
                    'NodeJS',
                    'Problem solving',
                    'Comunication'
                ]
            },
            {
                thumbnail: 'https://serene-williams-bb8bee.netlify.app/images/Portfolieo/Gafra.png',
                conpanyName: 'Gafra.fr',
                details: [
                    'Built / designed complex customer facing price quotation software',
                    'Utilized HTML, CSS, and Javascript to convert designs from sketch to Webpack.',
                    'Released update to over 2,000 people.'
                ],
                jobTitle: 'Javascript Developer',
                description: 'I worked on this app/site',
                hasVisit: 'true',
                visit: 'https://senpa.io/',
                hasGitHub: 'false',
                github: '',
                skill: [
                    'React native',
                    'Webpack',
                    'Javascript',
                    'HTML',
                    'CSS',
                    'UI',
                    'UX',
                    'NodeJS',
                    'Problem solving',
                    'Comunication'
                ]
            },
            {
                thumbnail: 'https://serene-williams-bb8bee.netlify.app/images/Portfolieo/PrivateJetPro.png',
                conpanyName: 'Private-jets.pro',
                details: [
                    'Built / designed complex customer facing price quotation software',
                    'Utilized HTML, CSS, and Javascript to convert designs from sketch to Webpack.',
                    'Released update to over 2,000 people.'
                ],
                jobTitle: 'Javascript Developer',
                description: 'I worked on this app/site',
                hasVisit: 'true',
                visit: 'https://senpa.io/',
                hasGitHub: 'false',
                github: '',
                skill: [
                    'React native',
                    'Webpack',
                    'Javascript',
                    'HTML',
                    'CSS',
                    'UI',
                    'UX',
                    'NodeJS',
                    'Problem solving',
                    'Comunication'
                ]
            },
        ])
        .then(experiences => {
            res.json(experiences);
        })
        .catch(err => {
            res.json(err);
        })
    })
    .catch(err => {
        console.error(err.message);
        res.json(err);
    });
    */
});

router.get('/postNewViaGet', (req, res)=> {
	let newExperience = utilities.assembleExperience(req);
    Experience.create(newExperience, (err, experience) => {
        if(err){
            res.status(500).send('Failed to crate new experience');
        }
        else{
            res.status(200).json(experience);
        }   
    });
});

router.post('/', (req, res) => {
    console.log('In post');
    let newExperience = utilities.assembleExperience(req);
    Experience.create(newExperience, (err, experience) => {
        if(err){
            res.status(500).send('Failed to crate new experience');
        }
        else{
            res.status(200).redirect('/');
        }   
    });
});

router.get('/', (req, res) => {
    Experience.find({}, (err, experiences) => {
        if(err){
            res.status(500).send('Failed to get experiences on our end');
        }
        else{
            res.status(200).render('experience/index', {experiences: experiences});
        }
    });
});

module.exports = router;