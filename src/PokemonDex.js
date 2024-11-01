import React, { useState } from 'react';
import axios from 'axios';

const PokemonDex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemonList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0'); 
      const results = response.data.results;

      const detailedPokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          return pokemonData.data;
        })
      );

      setPokemonList(detailedPokemonData);
    } catch (error) {
      console.error('Error fetching pokemon data:', error);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>API</h1>
      <h1>Pokemon</h1>
      <button onClick={fetchPokemonList} className="button-blue">Get pokemon dex</button>
    
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        pokemonList.map((pokemon) => (
          <div key={pokemon.id} style={{ backgroundColor: 'lightgreen', margin: '20px', padding: '10px' }}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ backgroundColor: 'white', margin: '10', padding: '0px' }}/>
            <img src={pokemon.sprites.back_default} alt={pokemon.name} style={{ backgroundColor: 'white', margin: '10', padding: '0px' }}/>


            <div className="stat">
                <h2><strong>Name : </strong>{pokemon.name.toUpperCase()}</h2>
                <p><strong>Type 1:</strong> {pokemon.types[0].type.name}</p>
                {pokemon.types[1] && <p><strong>Type 2:</strong> {pokemon.types[1].type.name}</p>}
                <p><strong>Base stats:</strong></p>
                <ul>
                {pokemon.stats.map((stat) => (
                    <li key={stat.stat.name}>{`${stat.stat.name} = ${stat.base_stat}`}</li>
                ))}
                </ul>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PokemonDex;
