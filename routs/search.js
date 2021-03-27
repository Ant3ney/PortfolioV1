const express = require('express'),
    router = express.Router(),
    Projects = require('../models/project'),
    util = require('../middleware/utilities');

router.get('/', (req, res) => {
    let search = req.query.search;
    util.getProjectsThatMatchSearch(search)
    .then(projects => {
        console.log(projects);
        res.render('search/index', {projects: projects, search: search});
    })
    .catch(err => {
        res.send('An error happeoned with your search');
        console.error(err.message);
    })
    
});

module.exports = router;