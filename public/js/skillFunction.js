var skillsContainer = document.querySelector(".multi-skill-container");
var addSkill = document.querySelector("#add-skill");
var index = document.getElementsByClassName("skill-ele").length;
var deleteSkillIcons = document.querySelectorAll("#skill-list .del-icon-container");
var skillEle = document.getElementsByClassName("skill-ele");

//#region Reformed list functionality
class List{
	constructor(id){
		this.id = id;
		this.listContainer = document.querySelector(`#${id}`);
		this.addListBtn = document.querySelector(`#${id} .add-list`);
		this.deleteListBtns = this.listContainer.querySelectorAll(`.list-delete-icon`);
		this.index = {
			value: document.getElementsByClassName("list-ele").length,
			get: () => {
				return this.index.value;
			},
			incrament: () => {
				this.index.value += 1;
			},
			deciment: () => {
				this.index.value -= 1;
			}
		}
	}

	start(){
		this.addListBtn.addEventListener('click', (event) => {
			event.preventDefault();
			this.addListClicked(this.id);
		});
		this.setUpDeleteListeners();
	}

	setUpDeleteListeners(){
		for(let i = 0; i < this.deleteListBtns.length; i++){
			this.deleteListBtns[i].addEventListener("click", () => {
				this.deleteIconPressdOfIndex(i);
			});
		}
	}

	refactorEles(){
		let listEle = this.listContainer.getElementsByClassName('list-ele')
		for(let i = 0 ; i < listEle.length; i++){
			listEle[i].setAttribute("name", `${this.id}-ele-${i}`);
		}
	}

	deleteIconPressdOfIndex(i){
		let iconContainer = this.listContainer.getElementsByClassName("single-list-container")[i];
		iconContainer.remove();
		this.refactorEles();
		this.index.deciment();
	}

	deleteEleParrent(ele){
		ele.parentNode.remove();
		this.refactorEles();
		this.index.deciment();
	}

	addListClicked(){
		let containerID = this.id;
		const listContainer = this.listContainer.querySelector(`.multi-list-container`);
		const index = this.index.get();
		
		//create new element
		const newInput = document.createElement("Input");
		const skillContainer = document.createElement("Div");
		const iconContainer = this.listContainer.querySelector(".del-icon-container").cloneNode(true);
		
		skillContainer.classList.add(`single-list-container`);
		
		iconContainer.addEventListener("click", () => {
			this.deleteEleParrent(iconContainer);
		});
		
		newInput.classList.add("list-ele");
		newInput.classList.add("form-ele");
		newInput.classList.add("list-ele-" + index);
		newInput.classList.add("mb-2");
		newInput.setAttribute("name", `${containerID}-ele-${index}`);
		newInput.setAttribute("placeholder", 'new item');
		
		skillContainer.appendChild(newInput);
		skillContainer.appendChild(iconContainer);
		
		this.index.incrament();
		
		//add new element to list
		listContainer.appendChild(skillContainer);
	}
}

addListFunctionalityTo(['experience-details-list']);

function addListFunctionalityTo(ids){
	ids.forEach((id) => {
		let list = new List(id);
		list.start();
	});
}
//#endregion

//#region Old list functility
function deleteIconPressOfIndex(i){
	var iconContainer = document.getElementsByClassName("single-skill-container")[i];
	iconContainer.remove();
	refactorEles();
	index--;
}

function deleteEleParrent(ele){
	ele.parentNode.remove();
	refactorEles();
	index--;
}

function refactorEles(){
	for(var i = 0 ; i < skillEle.length; i++){
		skillEle[i].setAttribute("name", "skill-ele-" + i);
	}
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
//#endregion