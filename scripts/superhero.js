// declare timer
var timer;
//declare genders
let maleChoice;
let femaleChoice;
// get search box values
const searchSuper = function() {
    // hide popup by default
    const popup = document.querySelector('.popup');
    popup.style.visibility = 'hidden';

    let searchInput = document.querySelector('.search-box');
     

    //listen to checkboxes
    //get desired gender
    
    document.querySelector('.gender-male').addEventListener('change', function(e) {
        if(document.querySelector('.gender-male').checked) {
            maleChoice = 1;
            document.querySelector('.gender-male').style.color = "#FF0000";
        } else {
            maleChoice = 0
        }
        
    })
    document.querySelector('.gender-female').addEventListener('change', function(e) {
        if(document.querySelector('.gender-female').checked) {
            femaleChoice = 1;
        } else {
            femaleChoice = 0
        }
        
    })
    


    searchInput.addEventListener('keyup', function(e) {
        // timer to get faster response
        clearTimeout(timer);
        timer = setTimeout(function() {}, 1000);
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

    const male = maleChoice;
    const female = femaleChoice;


    const maleArr = [];
    const femaleArr = [];
    let list = document.querySelector('.hero-list');
   
    // make male array
    for(i of results) {
        if(i.appearance.gender == 'Male') {
            maleArr.push(i);
        }
    }


    //make female array
    for(i of results) {
        if(i.appearance.gender == 'Female') {
            femaleArr.push(i);
        }
    }

    //decide what collection is needed
    let neededCollection;
    if(male == 1) {
        neededCollection = maleArr;
    } else if(female == 1) {
        neededCollection = femaleArr;
    } else {
        neededCollection = results;
    }

    // make list of results
    for(i of neededCollection) {
        
        let image = i.image.url;
        list.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="c-search__card">
            <img src="${image}" alt="${i.name}">
            <h2>${i.name}</h2>
            <a onclick="showPopup(${i.id})" class="c-button c-search__card-button hero-link">more info</a>
        </div>
    </div>`;
    }
}

// show popup
const showPopup = function(id) {
    const popup = document.querySelector('.popup');
    popup.addEventListener('click', function() {
        popup.style.visibility = 'hidden';
    })
    
    
    //send id to api and show popup

    popup.style.visibility = 'visible';
    handleData(`https://superheroapi.com/api/3201327110080157/${id}`, populatePopup);

}
//populate popup with hero data
const populatePopup = function(data) {
    //appearance data
    let image = data.image.url;
    let gender = data.appearance.gender;
    let race = data.appearance.race;
    let height = data.appearance.height[1];
    let weight = data.appearance.weight[1];
    let eye = data.appearance['eye-color'];
    let hair = data.appearance['hair-color'];
    
    document.querySelector('.popup-title').innerHTML = data.name;
    document.querySelector('.hero-image').src = image;
    document.querySelector('.gender').innerHTML = gender;
    document.querySelector('.race').innerHTML = race;
    document.querySelector('.height').innerHTML = height;
    document.querySelector('.weight').innerHTML = weight;
    document.querySelector('.eye').innerHTML = eye;
    document.querySelector('.hair').innerHTML = hair;

    //bio data

    let aliases = data.biography.aliases;
    let alignment = data.biography.alignment;
    let ego = data.biography['alter-egos'];
    let appearance = data.biography['first-appearance'];
    let name = data.biography['full-name'];
    let birth = data.biography['place-of-birth'];
    let publisher = data.biography.publisher;

    document.querySelector('.aliases').innerHTML = aliases;
    document.querySelector('.alignment').innerHTML = alignment;
    document.querySelector('.ego').innerHTML = ego;
    document.querySelector('.appearance').innerHTML = appearance;
    document.querySelector('.name').innerHTML = name;
    document.querySelector('.birth').innerHTML = birth;
    document.querySelector('.publisher').innerHTML = publisher;

    //connections
    let group = data.connections['group-affiliation'];
    let relatives = data.connections.relatives;

    document.querySelector('.group').innerHTML = group;
    document.querySelector('.relatives').innerHTML = relatives;

    //powerstats
    let combat = data.powerstats.combat;
    let durability = data.powerstats.durability;
    let intelligence = data.powerstats.intelligence;
    let power = data.powerstats.power;
    let speed = data.powerstats.speed;
    let strength = data.powerstats.strength

    document.querySelector('.combat').innerHTML = combat;
    document.querySelector('.durability').innerHTML = durability;
    document.querySelector('.intelligence').innerHTML = intelligence;
    document.querySelector('.power').innerHTML = power;
    document.querySelector('.speed').innerHTML = speed;
    document.querySelector('.strength').innerHTML = strength;

    //work
    let base = data.work.base;
    let occupation = data.work.occupation;

    document.querySelector('.base').innerHTML = base;
    document.querySelector('.occupation').innerHTML = occupation;

}

//start button
const clickToSection = function() {
    document.querySelector('.clickToSection').addEventListener('click', function() {
        document.querySelector('.c-search__items').scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    searchSuper();
    clickToSection();
    
});