import React, { Component } from 'react';
import User from "../interface/User.interface";

//Creating interface for SearchState and Pokemon
export interface SearchState {
    error: boolean;
    pokemon: Pokemon;
    count: number;
}

//Pokemon information type
interface Pokemon {
    name: string;
    abilities: number;
    experience: number;
    imageURL: string;
    weight: number;
}

export class pokemonSearch extends Component<User, SearchState>
{

    //Reference of the Pokemon 

    pokemonRef: React.RefObject<HTMLInputElement>;


    constructor(props:User)
    {
        super(props);
        //Initializing error and pokemon
        this.state = {
            error: false,
            pokemon: null,
            count: 0
        };
        //creating the React Reference.
        this.pokemonRef = React.createRef();
    }

    //Search function, returns nothing

    onSearchClick = (): void => {

        //Getting current value of Reference
        const inputValue = this.pokemonRef.current.value;

        //Fetching api end point
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then((res) => {
          
        // Checking if the request was succesfully.

        if (res.status !== 200) {
            //If not succesull error is true
            this.setState({ error: true });
            return;
          }
          res.json().then((data) => {
            //Getting information from the pokemon API and storing them into their respective variables
            this.setState({
              error: false, 
              count: this.state.count + 1,
              pokemon: {
                name: data.name, 
                abilities: data.abilities.length, 
                experience: data.base_experience, 
                imageURL: data.sprites.front_default, 
                weight: data.weight
              },
              
            });
          });
        });
      };

    render()
    {
        //retrieving values
        ///destructuring objects

        const { name: userName, numberPokemons } = this.props; 
        const { error, pokemon } = this.state;

        
        //variable to see what request should be shown to the user.

        let resultMarkup;
        
            //If error is true, prints message to the user
           if(error && this.state.count == 0)
            {
                resultMarkup = <p className="error-m">Sorry, the pokemon was not found :(! <br/> You have 0 pokemons found!</p>
            }
            //if erorr is false it will print the current state of the pokemon interface.
            else if (this.state.pokemon)
            {
                resultMarkup = (
                
                    //Div with all the information retrieve from the pokemon API

                <div>
                <img src = {pokemon.imageURL} alt = "Pokemon" className = "pokemonImage"/>
                <p>
                {pokemon.name} has {pokemon.abilities} abilities and {pokemon.experience} with base experience!
                </p>
                <p>The weight of {pokemon.name} is {pokemon.weight}</p>
                <p>You have found <span style={{fontWeight:"bold"}}>{this.state.count}!</span></p>
            </div>
                );
            }

            return (
                //Current user information (can be changed in the App.tsx file)
                //prints the MArkup
                <div>
                  <p className="p-userinfo">
                   Hello, {userName}{' '}!</p>
                    <p className="p-extrainfo">{numberPokemons && <span> There are {numberPokemons} pokemons!</span>}</p>
                  
                    <input className="input-box" placeholder="Pokemon name" type= "text" ref={this.pokemonRef} required></input>
                <button className = "button-search" onClick={this.onSearchClick}>Search!</button>
                  {resultMarkup}
                </div>
              );
    }
}

export default pokemonSearch;
