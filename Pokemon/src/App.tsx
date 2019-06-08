import React, { Component } from 'react';
import PokemonSearch from './components/pokemonSearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PokemonSearch name="Daniel Chavez" numberPokemons={807} />
      </div>
    );
  }
}

export default App;