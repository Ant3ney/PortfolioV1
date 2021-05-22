const express = require('express'),
    router = express.Router(),
    Projects = require('../models/project'),
    util = require('../middleware/utilities');

router.get('/', (req, res) => {
    let search = req.query.skill;
    let priority = req.query.priority;
    console.log(`priorty: ${priority}`);
    console.log(`search: ${search}`);
    util.getProjectsThatMatchSearch(search)
    .then(results => {
        let {projects, experiences} = results;
        res.render('search/index', {experiences: experiences, projects: projects, search: search, settings: {
            priorty: priority
        }});
    })
    .catch(err => {
        res.send('An error happeoned with your search');
        console.error(err.message);
    })
    
});

module.exports = router;