class List{
	constructor(id){
		this.id = id;
		this.listContainer = document.querySelector(`#${id}`);
		this.addListBtn = document.querySelector(`#${id} .add-list`);
		this.deleteListBtns = this.listContainer.querySelectorAll(`.list-delete-icon`);
		this.index = {
			value: this.listContainer.getElementsByClassName("list-ele").length,
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
		let listEle = this.listContainer.getElementsByClassName('list-ele');
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
		
        console.log(index)
		this.index.incrament();
		
		//add new element to list
		listContainer.appendChild(skillContainer);
	}
}