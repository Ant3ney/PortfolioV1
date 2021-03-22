const Projects = require('../models/project'); 

let databaseUtil = {
    getProjectViaId: (id) => {
        return new Promise((resolve, reject) => {
            Projects.findById(id, (err, project) => {
                if(err){
                    console.error('Something went wrong on databas get project via function part of Projects.findById function because ' + err.message);
                    reject(err);
                }
                else{
                    resolve(project);
                }
            })
        });
    }
}

module.exports = databaseUtil;