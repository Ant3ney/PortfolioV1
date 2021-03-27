function onSearchForm(e){
    let input = document.getElementById('search-form-input');
    let search = input.value;
    e.preventDefault();

    e.action = `/search?search=${search}`;
    e.target.submit();
}