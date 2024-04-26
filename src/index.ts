// Imports use relative file paths or Node.js package names
import { searchButton,  textInput , trashButton } from './dom-utils';
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

interface Pokemon{
    name: string;
    id: string;
    types: string;
    sprites: any;
    type:any;
    url: string;
}

let userText: string;
let pokemonList: any[] = [];
let pokemonListFilter: any[] = [];
let indexNew: number = 1;
let ut: string;

startApi();

function startApi(){
    getPokemon();
}

    searchButton.addEventListener("click", function(e) {
        e.preventDefault(); //warum????
        userText = textInput.value; //lesen der Usereingabe
        ut = userText.toLocaleLowerCase();
        console.log(ut)
        console.log("button angeklickt")
       
        pokemonList.forEach(element => {
            indexNew++;
            
            if(ut == element.name)
            {
                console.log(element.name);
                console.log("gefunden")
                pokemonListFilter.push(element);
                
                renderOnePokemon(pokemonListFilter);
                
            }
            else if(indexNew == 151 && ut != element.name && ut.length != 1)
            {
                //pokemonList.indexOf(userText) == -1
                //typeof ut == 'number'
                //|| ut.length != 1 || !(ut.match(/[a-z]/i))
                    indexNew = 1;
                    //let allPokemonContainer = document.getElementById('pokes-container');
                    console.log("im else-if");
                    alert("Es wurde kein Pokemon gefunden");
                    textInput.value = "";
                    /*
                    let fehlerText = document.createElement("h1");
                    fehlerText.innerHTML = "Es wurde kein Pokemon gefunden";
                    allPokemonContainer?.insertAdjacentElement('afterbegin', fehlerText)
                    */
                
            }
             
        });
    });



trashButton.addEventListener("click", function(e){
    e.preventDefault();
    console.log("Trash Button wurde geklickt");
    textInput.value = "";
    pokemonListFilter = [];
    let allPokemonContainer = document.getElementById('pokes-container');

    //das Div wird geleer bzw. Inhalt entfernt
    while(allPokemonContainer?.firstChild){
        allPokemonContainer.removeChild(allPokemonContainer.firstChild)
    }

    pokemonList.forEach(element => {
        //console.log(element)
        renderAllPokemonArray(element);

    })

    console.log("Trash Beendet");
})

function getPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    //.then(allPokemon => console.log(allPokemon))
    .then(function(allPokemon){
        allPokemon.results.forEach((pokemon:Pokemon)=> {
            fechtPokemonData(pokemon);
            
        })
    })

}

 function fechtPokemonData(pokemon:Pokemon){
    let url= pokemon.url;
    fetch(url)
    .then(response=>response.json())
   //.then(pokeData => console.log(pokeData)); //pro Array-Eintrag ist ein Pokemon
    .then(function(onePokemon){
        
        pokemonList.push(onePokemon); //in Array werden alle Daten von Pokemon reingetan
            renderPokemon(onePokemon);
            
 })

}

function renderAllPokemonArray(pokemonList:Pokemon){
    console.log("in der funktion");
    console.log(pokemonList.name)
    let allPokemonContainer = document.getElementById('pokes-container');
    //das Div wird geleer bzw. Inhalt entfernt
    
    let pokeContainer = document.createElement("div")
    pokeContainer.id = "onePokemonCard";
 
    let pokeName = document.createElement('h4') //Name des Pokemons als 'Überschrift'
    //pokeName.innerText = pokemonListFilter[0].name //Name von Pokemon
    pokeName.innerText = pokemonList.name;

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = pokemonList.id //ID des Pokemons

    let pokeTypes = document.createElement('ul') //Stichpunkte Liste wird erstellt
    createTypes(pokemonList.types, pokeTypes) //in der Stichpunkte Liste werden 'bullet points' erstellt 
    

    let pokeImage = document.createElement('img')
    pokeImage.id= 'imagePok';
    pokeImage.src =  pokemonList.sprites.other.dream_world.front_default;

    pokeContainer.append(pokeName, pokeImage, pokeTypes);
    
    allPokemonContainer?.appendChild(pokeContainer);

    console.log("ende der funktion")
 }


function renderOnePokemon(pokemonListFilter){
    console.log("in der funktion");
    
    let allPokemonContainer = document.getElementById('pokes-container');
    //das Div wird geleer bzw. Inhalt entfernt
    while(allPokemonContainer?.firstChild){
        allPokemonContainer.removeChild(allPokemonContainer.firstChild)
    }

    let pokeContainer = document.createElement("div")
    pokeContainer.id = "onePokemonCard";
 
    let pokeName = document.createElement('h4') //Name des Pokemons als 'Überschrift'
    //pokeName.innerText = pokemonListFilter[0].name //Name von Pokemon
    pokeName.innerText = pokemonListFilter[0].name.charAt(0).toUpperCase() + pokemonListFilter[0].name.slice(1);

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = pokemonListFilter.id //ID des Pokemons

    let pokeTypes = document.createElement('ul') //Stichpunkte Liste wird erstellt
    createTypes(pokemonListFilter.types, pokeTypes) //in der Stichpunkte Liste werden 'bullet points' erstellt 
    

    let pokeImage = document.createElement('img')
    pokeImage.id= 'imagePok';
    pokeImage.src =  pokemonListFilter.sprites.other.dream_world.front_default;

    pokeContainer.append(pokeName, pokeImage, pokeTypes);
    
    allPokemonContainer?.appendChild(pokeContainer);
    console.log("ende der funktion")
 }


 function renderPokemon(pokeData:Pokemon){

    let allPokemonContainer = document.getElementById('pokes-container');
    
    let pokeContainer = document.createElement("div")
    pokeContainer.id = "onePokemonCard";
 
    let pokeName = document.createElement('h3') //Name des Pokemons als 'Überschrift'
    pokeName.innerText = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1); //Name von Pokemon
    
    /* Alternative:
    let name = pokeName.innerHTML;
    let tes = name.charAt(0).toUpperCase() + name.slice(1);
    pokeName.innerHTML = tes;
    */
    
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = pokeData.id //ID des Pokemons

    let abilites = document.createElement('p')
    abilites.innerText = "Abilities:"    

    let pokeTypes = document.createElement('ul') //Stichpunkte Liste wird erstellt
    
    createTypes(pokeData.types, pokeTypes) //in der Stichpunkte Liste werden 'bullet points' erstellt 

    let pokeImage = document.createElement('img')
    pokeImage.id= 'imagePok';
    pokeImage.src =  pokeData.sprites.other.dream_world.front_default;

    pokeContainer.append(pokeName, pokeImage,abilites, pokeTypes);
    
    allPokemonContainer?.appendChild(pokeContainer);
    
 }

function createTypes(types, ul){
    types.forEach(function(type:Pokemon){
        let typeLi = document.createElement('li');
        //console.log(typeLi);
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}




