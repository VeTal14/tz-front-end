var mainBlock = document.getElementById('main');

let xhttp = new XMLHttpRequest();
xhttp.open('GET','https://swapi.co/api/films/');
xhttp.send();

var filmsArr = [];
xhttp.onreadystatechange = function(){
    
    
    if(xhttp.status === 200 && xhttp.readyState === 4){
        var films = JSON.parse(xhttp.response).results;
        filmsArr = films;
        films.sort(function(prev,next){
           if(prev.title > next.title){
               return 1
           }
           if(prev.title < next.title){
               return -1
           }
           return 0
        })
        
        films.forEach(film => mainBlock.appendChild(document.createElement("li")).innerHTML = film.title);
    }

    var infoBlock = document.getElementById("info");
    var li = document.getElementsByTagName('li');

    function getCharacters(){
        if(showCharacters) {
            charactersBlock.innerHTML = 'Characters:';
            showCharacters = false;
            return;
        }
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET','https://swapi.co/api/people/');
        xhttp.send();
        xhttp.onload = function(){
            let characters = JSON.parse(xhttp.response).results;
            characters.forEach(character =>{
                charactersBlock.innerHTML += character.name + " ";
            });
            
        }
        showCharacters = true;
        
        
        
        // infoBlock.innerHTML += JSON.parse(xhttp2.response).results;
    }
    function getStarships(){
        if(showStaships) {
            starshipsBlock.innerHTML = 'Starships:';
            showStaships = false;
            return;
        }
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET','https://swapi.co/api/starships/');
        xhttp.send();
        xhttp.onload = function(){
            let starships = JSON.parse(xhttp.response).results;
            starships.forEach(starship =>{
                starshipsBlock.innerHTML += starship.name + " ";
            });
            showStaships = true;
        }
    }

    function getPlanets(){
        if(showPlanets) {
            planetsBlock.innerHTML = 'Planets:';
            showPlanets = false;
            return;
        }
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET','https://swapi.co/api/planets/');
        xhttp.send();
        xhttp.onload = function(){
            let planets = JSON.parse(xhttp.response).results;
            planets.forEach(planet =>{
                planetsBlock.innerHTML += planet.name + " ";
            });
            showPlanets = true;
        }
    }

    var charactersBlock = document.createElement("div");
    var showCharacters = false;
    var starshipsBlock = document.createElement("div");
    var showStaships = false;
    var planetsBlock = document.createElement("div");
    var showPlanets = false;
    for(let i = 0; i < li.length; i ++){
        
        li[i].addEventListener("click",()=>{
            infoBlock.innerHTML = "Title: " + filmsArr[i].title + "<br>";
            infoBlock.innerHTML += "Director: " + filmsArr[i].director + "<br>";
            infoBlock.innerHTML += "Created: " + filmsArr[i].created + "<br>";
            infoBlock.innerHTML += "Edited: " + filmsArr[i].edited + "<br>";
            infoBlock.innerHTML += "Episode_id: " + filmsArr[i].episode_id + "<br>";
            infoBlock.innerHTML += "Url: " + filmsArr[i].url + "<br>";
            var check = false;
            if(!check){
                check = true;
                infoBlock.appendChild(charactersBlock);
                charactersBlock.addEventListener("click",getCharacters);
                charactersBlock.innerHTML = "Characters: " + "<br";
    
                infoBlock.appendChild(starshipsBlock);
                starshipsBlock.addEventListener("click",getStarships);
                starshipsBlock.innerHTML = "Starships: " + "<br";
    
                infoBlock.appendChild(planetsBlock);
                planetsBlock.addEventListener("click",getPlanets);
                planetsBlock.innerHTML = "Planets: " + "<br>";
                
            }
            
        });
    }
    
    // input.addEventListener('keyup',returnFilms (input.value));
}

var input = document.getElementById('search');

var returnFilms = function(){
    var li = document.getElementsByTagName('li');
    if(input.value == "" || input.value == undefined || input.value == 0){
        for( let i = 0; i < li.length; i ++){
            li[i].style.display = 'list-item';
        }
    }
    // console.log(filmsArr);
    console.log(input.value);
    var symbols = input.value.split('');
    console.log(symbols);
    
    // console.log(filmsArr);
    
    
    symbols.forEach((symbol,index)=>{
        console.log(filmsArr);
        // console.log(symbolsFilm);
        filmsArr.forEach((film,indexFilm)=>{
            var symbolsFilm = film.title.toLowerCase().split('');
            console.log(symbolsFilm);
            
            if(symbol !== symbolsFilm[index]){
                console.log(symbol);
                    li[indexFilm].style.display = 'none';
            }
            else if(symbol === symbolsFilm[index] && symbols[index-1] === symbolsFilm[index-1])
                    li[indexFilm].style.display = 'list-item';
                    // console.log(indexFilm + ' symbol ' + symbolsFilm[indexFilm]);
             
        });   
    });
}