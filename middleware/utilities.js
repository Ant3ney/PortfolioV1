//Location to store helper functions needed around the app
const middle = {};
let Projects = require('../models/project');
let Experience = require('../models/experience');
const project = require('../models/project');

middle.tempLog = msg => {
   console.log('-*Delete later*-');
   console.log(msg);
};

//create new project object
middle.assembleProject = req => {
   var body = req.body;
   console.log(body['skill-ele-0']);

   var visitableProject = 'false';
   var visitableScorce = 'false';
   if (body.visitableProject === 'on') {
      visitableProject = 'true';
   }
   if (body.visitableScorce === 'on') {
      visitableScorce = 'true';
   }

   var projectObj = {
      thumbnail: body.imgUrl,
      title: body.title,
      description: body.description,
      hasVisit: visitableProject,
      visit: body.visitUrl,
      hasGitHub: visitableScorce,
      github: body.githubUrl,
      skill: middle.createSkillArray(req),
   };

   console.log(projectObj);

   return projectObj;
};

middle.assembleExperience = req => {
   let body = req.body;
   if (!body) {
      console.error('Tried to create expereicne when req.body is undefined');
   }
   var visitableProject = 'false';
   var visitableScorce = 'false';
   if (body.visitableProject === 'on') {
      visitableProject = 'true';
   }
   if (body.visitableScorce === 'on') {
      visitableScorce = 'true';
   }

   return {
      thumbnail: body.imgUrl,
      conpanyName: body.conpanyName,
      jobTitle: body.jobTitle,
      description: body.description,
      details: middle.createArrayOf(req, 'experience-details-list'),
      hasVisit: visitableProject,
      visit: body.visitUrl,
      hasGitHub: visitableScorce,
      github: body.githubUrl,
      skill: middle.createArrayOf(req, 'skill-list'),
      priority: body.priority,
   };
};

middle.createArrayOf = (req, type) => {
   let body = req.body;
   let typedArray = [];
   let i = 0;

   while (req.body[`${type}-ele-${i}`]) {
      let item = body[`${type}-ele-${i}`].toString();
      if (item === '') {
         continue;
      }
      typedArray.push(item);

      i++;
   }

   return typedArray;
};

middle.createSkillArray = req => {
   let body = req.body;
   let skills = [];
   let i = 0;

   while (req.body['skill-ele-' + i]) {
      let skill = body['skill-ele-' + i].toString();
      if (skill === '') {
         continue;
      }
      skills.push(skill);

      i++;
   }

   return skills;
};

//create new skill catetegory object
middle.assembleSkillCat = req => {
   var body = req.body;
   var skillCat;
   var skills = middle.createSkillArray(req);
   var skillTitle = body['category-ele'];

   skillCat = {
      category: skillTitle,
      skill: skills,
   };

   return skillCat;
};

//create new local user
middle.assembleLocalUser = (username, name, hash) => {
   var newUser = {
      username: username,
      name: name,
      id: null,
      password: hash,
      type: 'local',
      email: null,
   };

   return newUser;
};

//loop though users and find matching local username
middle.findIndexOfLocalUser = (users, username) => {
   var correctUserIndex = -1;

   //loop through and find index of user with correct username
   for (var i = 0; i < users.length; i++) {
      if (users[i].type === 'local' && users[i].username === username) {
         correctUserIndex = i;
         break;
      }
   }

   return correctUserIndex;
};

//loop through users and find one with matching google id
middle.findIndexOfOAuthUser = function (users, profile) {
   var returnVal = -1;
   users.forEach((user, i) => {
      if (user.id && user.id.toString() == profile.id.toString()) {
         returnVal = i;
      }
   });
   return returnVal;
};

//Create new user object
middle.assembleOAuthUser = function (profile, type) {
   var user = {
      username: profile.displayName,
      name: profile.displayName,
      id: profile.id,
      password: 'null',
      type: type,
   };

   return user;
};

//Create new user object
middle.assembleGithubUser = function (profile, type) {
   var user = {
      username: profile.username,
      name: profile.username,
      id: profile.id,
      password: 'null',
      type: type,
   };

   return user;
};

middle.cleanSearch = search => {
   if (!search || search.length <= 2) {
      if (!search) {
         return search;
      }
      return search.toLowerCase();
   }
   let retSearch = search.toLowerCase();
   let lastTwoIndexes = retSearch.slice(retSearch.length - 2);
   while (
      lastTwoIndexes === 'js' ||
      lastTwoIndexes === 'db' ||
      retSearch.indexOf(' ') >= 0
   ) {
      retSearch = retSearch.slice(0, retSearch.length - 2);
      retSearch = retSearch.replace(' ', '');
      lastTwoIndexes = retSearch.slice(retSearch.length - 2);
   }
   return retSearch;
};
middle.getProjectsThatMatchSearch = searchRaw => {
   let search = middle.cleanSearch(searchRaw);
   return new Promise((resolve, reject) => {
      Promise.all([Projects.find({}), Experience.find({})])
         .then(results => {
            let projects = results[0];
            let experiences = results[1];

            if (projects.length <= 0) {
               reject({ message: 'No projects saved in databace' });
            }
            let matchedProjects = [];
            let matchedExperience = [];
            projects.forEach(project => {
               let projectObj = project.toObject();
               for (let i = 0; i < project.skill.length; i++) {
                  let skill = middle.cleanSearch(project.skill[i]);
                  if (search === skill) {
                     matchedProjects.push(projectObj);
                     break;
                  }
               }
            });

            experiences.forEach(experienceModel => {
               let experience = experienceModel.toObject();
               for (let i = 0; i < experience.skill.length; i++) {
                  let skill = middle.cleanSearch(experience.skill[i]);
                  if (search === skill) {
                     matchedExperience.push(experience);
                     break;
                  }
               }
            });

            let returnResults = {
               projects: matchedProjects,
               experiences: matchedExperience,
            };

            resolve(returnResults);
         })
         .catch(err => {
            reject({
               message:
                  'Error in middle utils getProjects of search project.find because ' +
                  err.message,
            });
         });
   });
};

middle.organizeSiteDataFromPriority = siteEntries => {
   return sortArray(siteEntries, 'priority');
};

function sortArray(a, organizationName) {
   let N = a.length;

   var i = 0,
      j = 0,
      v = 0,
      c = 0; // c = compare value

   for (i = 1; i < N; i++) {
      v = a[i][organizationName] || -500;
      j = i;
      c = a[j - 1][organizationName] || -500;
      while (j > 0 && c < v) {
         let buffer = a[j];
         a[j] = a[j - 1];
         a[j - 1] = buffer;
         j--;
         if ((c = a[j - 1])) {
            c = a[j - 1][organizationName] || -500;
         }
      }
      a[j][organizationName] = v;
   }
   return a;
}

module.exports = middle;
