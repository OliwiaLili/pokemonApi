// Imports use relative file paths or Node.js package names
import { buttonTest,  textInput  } from './dom-utils';
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




let userText = textInput.innerHTML;

userText = "hallo";
console.log("test 1: " + userText );

buttonTest.addEventListener("click", function(e) {
    e.preventDefault(); //warum????
    userText = textInput.value; //lesen der Usereingabe

    console.log("button angeklickt")
    console.log("test 2 " + userText);
    
    let allPokemonContainer = document.getElementById('pokes-container')
    allPokemonContainer?.remove();

    

   // allPokemonContainer?.remove();
    


});


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
        //console.log(onePokemon);
            renderPokemon(onePokemon);
            
 })

}



 function renderPokemon(pokeData){

    let allPokemonContainer = document.getElementById('pokes-container');
    
    let pokeContainer = document.createElement("div")
    pokeContainer.id = "onePokemonCard";
 
    let pokeName = document.createElement('h4') //Name des Pokemons als 'Überschrift'
    pokeName.innerText = pokeData.name //Name von Pokemon
    
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = pokeData.id //ID des Pokemons

    let pokeTypes = document.createElement('ul') //Stichpunkte Liste wird erstellt
    createTypes(pokeData.types, pokeTypes) //in der Stichpunkte Liste werden 'bullet points' erstellt 

    let pokeImage = document.createElement('img')
    pokeImage.id= 'imagePok';
    pokeImage.src =  pokeData.sprites.other.dream_world.front_default;

    pokeContainer.append(pokeName, pokeImage, pokeTypes);
    
    allPokemonContainer?.appendChild(pokeContainer);
    
    
    
    
 }

function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        //console.log(typeLi);
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}



getPokemon();
