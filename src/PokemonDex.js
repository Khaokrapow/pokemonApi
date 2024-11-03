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
    <div>
      <h1>API</h1>
      <h1>Pokemon</h1>
      <button onClick={fetchPokemonList} className="blue-button">Get pokemon dex</button>
  
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-container">
          {pokemonList.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <img src={pokemon.sprites.back_default} alt={pokemon.name} />
              <div className="stat">
                <p><strong>Name : </strong>{pokemon.name.toUpperCase()}</p>
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
          ))}
        </div>
      )}
    </div>
  );
  
};

export default PokemonDex;
