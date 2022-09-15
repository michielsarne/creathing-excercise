// declare timer
var timer;
// get search box values
const searchSuper = function() {
    let searchInput = document.querySelector('.search-box');
    searchInput.addEventListener('keyup', function(e) {
        // timer to get faster response
        clearTimeout(timer);
        timer = setTimeout(function() {}, 1);
        const searchString = e.target.value;
        // clear previous searched params in getSuper
        let list = document.querySelector('.hero-list');
        list.innerHTML = "";
        // check if search param is empty, if empty do nothing
        if(searchString == "") {
        } else {
            //if valid call api with search params and send to getSuper
            handleData(`https://superheroapi.com/api/3201327110080157/search/${searchString}`, getSuper);
        }
    })

    
}

//display searched params
const getSuper = function(data) {
    const results = data.results;
    let list = document.querySelector('.hero-list');
    // make list of results
    for(i of results) {
        list.innerHTML += `<li>${i.name}</li>`;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    searchSuper();
});