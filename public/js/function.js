//Skill see all button functionality
var su = document.querySelectorAll(".skill-ul");
su.forEach((suel, i) => {
	var sl = document.querySelectorAll(".sl-" + (i + 1));
	var btn = document.querySelector(".sas-0" + (i + 1));
	btn.addEventListener("click", () => {
		if (!btn.classList.contains("pressed-button")){
			btn.classList.add("pressed-button");
			btn.innerHTML = "See less";
			sl.forEach((el, i) => {
				if(i > 3)
				el.classList.remove("d-none");
			});
		}
		else{
			btn.classList.remove("pressed-button");
			btn.innerHTML = "See all"
			sl.forEach((el, i) => {
				if(i > 3)
				el.classList.add("d-none");
			});
		}
	});
	
});

//Project see all button functionality
var projects = document.querySelectorAll(".project-col-container");
var proBtn = document.querySelector(".see-all-projects");
proBtn.addEventListener("click", () => {
	if(proBtn.classList.contains("pressed-button")){
		for(var i = 3; i < projects.length; i++){
			proBtn.classList.remove("pressed-button");
			proBtn.innerHTML = "See all";
			projects[i].classList.add("d-none");
		}
	}
	else{
		for(var i = 3; i < projects.length; i++){
			proBtn.classList.add("pressed-button");
			proBtn.innerHTML = "See less";
			projects[i].classList.remove("d-none");
		}
	}
	
});