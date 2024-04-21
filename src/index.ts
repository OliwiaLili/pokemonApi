// Imports use relative file paths or Node.js package names
import { buttonTest  } from './dom-utils';
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import './styles/styles.css';

/*
//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE

// init App
textInput.addEventListener('input', (e) => {
    //log input value
    console.log((e.target as HTMLInputElement).value);
});
*/

function getPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    //.then(allPokemon => console.log(allPokemon))
    .then(function(allPokemon){
        allPokemon.results.forEach((pokemon)=> {
            fechtPokemonData(pokemon);
        })
    })

}

 function fechtPokemonData(pokemon:any){
    let url= pokemon.url;
    fetch(url)
    .then(response=>response.json())
   //.then(pokeData => console.log(pokeData)); //pro Array-Eintrag ist ein Pokemon
    .then(function(onePokemon){
        console.log(onePokemon);
            renderPokemon(onePokemon);
 })

}

 function renderPokemon(pokeData){

    let allPokemonContainer = document.getElementById('pokes-container');
    
    let pokeContainer = document.createElement("div")
    pokeContainer.id = "onePokemonCard";
   // pokeContainer.style.backgroundColor = "grey";
    /*
    pokeContainer.style.outline;
    pokeContainer.style.float = "left";
    pokeContainer.style.margin = "1em";
    pokeContainer.style.border = "inset";
    pokeContainer.style.padding="2em";
    pokeContainer.style.height="280px";
*/
    let pokeName = document.createElement('h4') //Name des Pokemons als 'Überschrift'
    pokeName.innerText = pokeData.name //Name von Pokemon
    //pokeName.style.backgroundColor="white";

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = pokeData.id //ID des Pokemons

    let pokeTypes = document.createElement('ul') //Stichpunkte Liste wird erstellt
    createTypes(pokeData.types, pokeTypes) //in der Stichpunkte Liste werden 'bullet points' erstellt 

    let pokeImage = document.createElement('img')
    pokeImage.id= 'imagePok';
    pokeImage.src =  pokeData.sprites.other.dream_world.front_default;
    //pokeImage.style.height="150px";
    //pokeImage.style.backgroundColor="lightgrey"

    pokeContainer.append(pokeName, pokeImage, pokeTypes);
    
    allPokemonContainer?.appendChild(pokeContainer);

 }

function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

function click(){
    document.getElementById('#searchClick');
    console.log("ich wurde geklickt");
    buttonTest.click();
}


getPokemon();
