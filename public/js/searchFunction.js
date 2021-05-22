urlParam = function(name, url) {
    if (!url) {
     url = window.location.href;
    }
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) { 
        return undefined;
    }
    return results[1] || undefined;
}

function onSearchForm(e){
    e.preventDefault();
    let input = document.getElementById('search-form-input');
    let search = input.value;
    let priority = urlParam('priority');
    e.action = `/search?skill=${search}&priority=${priority}`;
    e.target.submit();
}