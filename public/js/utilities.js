let showEle = (ele) => {
	while(ele.classList.contains('d-none')){
		ele.classList.remove('d-none');
	}
}
let hideEle = (ele) => {
	ele.classList.add('d-none');
}
function setUpSeeAllOfIDPressed(id){//Must have a complient stucture
    if(!id){
        return;
    }
    let container = document.getElementById(id);
    let seeAllEle = container.querySelector('.see-all');
    seeAllEle.addEventListener('click', () => {
        seeAllElePressed(container);
    })
}   

function seeAllElePressed(eleContainer){
    let operatOn = hideEle;
    let newText = 'See all';
    let seeAllEle = eleContainer.querySelector('.see-all');

    if(seeAllEle.innerText === 'See all'){
        operatOn = showEle;
        newText = 'See less';
    }
    let entrys = eleContainer.querySelectorAll('.single-container');
    for(let i = 0; i < entrys.length; i++){
        if(i > 1){
            let entry = entrys[i];
            operatOn(entry);
        }
    }
    seeAllEle.innerText = newText;
}