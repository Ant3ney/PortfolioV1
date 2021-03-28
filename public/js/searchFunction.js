function onSearchForm(e){
    let input = document.getElementById('search-form-input');
    let search = input.value;
    console.log(e);
    e.preventDefault();
    e.action = `/search?search=${search}`;
    e.target.submit();
}