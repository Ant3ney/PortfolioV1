//Project page functions
var deleteBtn = document.querySelector(".delete-btn-js");
var form = document.querySelector(".project-form-js");

//Add delete btn functionality
function deleteBtnPressed(){
	var id = window.location.href.toString().split(window.location.host)[1].split("/")[2];
	form.setAttribute("action", "/project/" + id + "?_method=DELETE");
	
	console.log("Delete action: " + form.getAttribute("action"));
}

if(deleteBtn){
	deleteBtn.addEventListener("click", deleteBtnPressed);
}