import React, { useState, useEffect } from "react";
import "../Styles/pokemon.css";
import PokemonBack from "../assets/Images/pokemon_back.jpg";

const PokemonDetails = ({ pokemonUrl }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pokemonUrl);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pokemonUrl]);

  if (loading) {
    return (
        <div className={`pokemon-card`}>
          <p></p>
          <img className="pokemon-img" src={PokemonBack} />
          <p></p>
        </div>
      );
  }

  if (!pokemonData) {
    return <p>Error loading data</p>;
  }

  return (
    <div
      className={`pokemon-card type-${pokemonData.types[0].type.name}`}
      id="card"
    >
      <h2 className="pokemon-name center">{pokemonData.name.toUpperCase()}</h2>
      <img
        className="pokemon-img"
        src={pokemonData.sprites.other.home.front_default}
        alt={pokemonData.name}
      />
      <p>Experience: {pokemonData.base_experience}</p>
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <div className="row">
        <div className="col-md-5">
          <h5>Abilities</h5>
          <ul>
            {" "}
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}{" "}
          </ul>
          <h5>Types</h5>
          <ul>
            {" "}
            {pokemonData.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}{" "}
          </ul>
        </div>
        <div className="col-md-7">
          <h5>Stats</h5>
          <ul>
            {" "}
            {pokemonData.stats.map((stats, index) => (
              <li key={index}>
                {stats.stat.name}: {stats.base_stat}
              </li>
            ))}{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
