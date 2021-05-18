const deleteBtn = document.querySelector('#modify-form .delete-btn-js');
if(deleteBtn){
	deleteBtn.addEventListener('click', (event) => {
		var id = window.location.href.toString().split(window.location.host)[1].split("/")[2];
		document.getElementById('modify-form').setAttribute("action", "/experience/" + id + "?_method=DELETE");
		alert('here');
	});
}

//#region See more experience button functionality
 try{
	setUpSeeAllOfIDPressed('experience-body');
 }
catch{
	console.log('Did not run setUpSeeAllOfIDPressed');
}	
//#endregion
//#region list functionality setup
try{
	addListFunctionalityTo(['experience-details-list', 'skill-list']);
}
catch{
	console.log('Did not run addListFunctionalityTo');
}

function addListFunctionalityTo(ids){
	ids.forEach((id) => {
		let list = new List(id);
		list.start();
	});
}
//#endregion
