//Project page functions
var deleteBtn = document.querySelector(".delete-btn-js");
var form = document.querySelector(".project-form-js");

//Add delete btn functionality
function deleteBtnPressed(){
	var id = getId();
	form.setAttribute("action", "/project/" + id + "?_method=DELETE");
}

function getId(){
	var url = window.location.href.toString();
	var domain = window.location.host;
	var dirHref = url.split(domain)[1];
	var id = dirHref.split("/")[2];
	return id;
}

if(deleteBtn){
	deleteBtn.addEventListener("click", deleteBtnPressed);
}