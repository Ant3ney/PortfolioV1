var skillsContainer = document.querySelector(".multi-skill-container");
var addSkill = document.querySelector("#add-skill");
var index = document.getElementsByClassName("skill-ele").length;
var deleteSkillIcons = document.getElementsByClassName("del-icon-container");

function deleteIconPressOfIndex(i){
	var icon = document.getElementsByClassName("del-icon-container")[i];
	var iconContainer = document.getElementsByClassName("single-skill-container")[i];
	console.log("Delete pressed from " + (i + 1));
	iconContainer.remove();
}

function deleteEleParrent(ele){
	ele.parentNode.remove();
}

//Add eventlisteners to delete icons
function setUpEventListeners(){
	for(var i = 0; i < deleteSkillIcons.length; i++){
		let newI = i;
		deleteSkillIcons[i].addEventListener("click", () => {
			deleteIconPressOfIndex(newI);
		});
	}
}
setUpEventListeners();

//handle create new skill input
function addSkillClicked(){
	event.preventDefault();
	
	//create new element
	var newInput = document.createElement("Input");
	var skillContainer = document.createElement("Div");
	var iconContainer = document.querySelector(".del-icon-container").cloneNode(true);
	
	skillContainer.classList.add("single-skill-container");
	
	iconContainer.addEventListener("click", () => {
		deleteEleParrent(iconContainer);
	});
	
	newInput.classList.add("skill-ele");
	newInput.classList.add("form-ele");
	newInput.classList.add("skill-ele-" + index);
	newInput.classList.add("mb-2");
	newInput.setAttribute("name", "skill-ele-" + index);
	newInput.setAttribute("placeholder", "skill");
	
	skillContainer.appendChild(newInput);
	skillContainer.appendChild(iconContainer);
	
	index++;
	
	//add new element to list
	skillsContainer.appendChild(skillContainer);
}

addSkill.addEventListener(("click"), addSkillClicked);

//handle delete button form
var deleteBtn = document.querySelector(".dele-btn");
var formEle = document.querySelector(".skill-form");

function deleteButtonPressed(){
	var id = window.location.href.toString().split(window.location.host)[1].split("/")[2];
	formEle.setAttribute("action", "/skill/" + id + "?_method=DELETE");
}

if(deleteBtn){
	deleteBtn.addEventListener("click", deleteButtonPressed);
}