import React, { useState, useEffect } from "react";
import PokemonBack from "../assets/Images/pokemon_back.jpg";

const PokemonSmall = ({ pokemonUrl }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cardElement = document.getElementById("card");
    if (cardElement) {
      cardElement.classList.add("rotate-on-load");
    }
  }, []);

  if (loading) {
    return (
      <div className={`pokemon-card-small rotate-on-load`} id="card">
        <p></p>
        <img className="pokemon-img" src={PokemonBack} />
        <p></p>
      </div>
    );
  }

  if (!pokemonData) {
    return (
      <div className={`pokemon-card-small rotate-on-load`} id="card">
        <p></p>
        <img className="pokemon-img" src={PokemonBack} />
        <p></p>
      </div>
    );
  }

  return (
    <div
      className={`pokemon-card-small type-${pokemonData.types[0].type.name} rotate-on-load`}
      id="card"
    >
      {showImage && (
        <div>
          <p>{pokemonData.name.toUpperCase()}</p>

          <img
            className="pokemon-img"
            src={pokemonData.sprites.other.home.front_default}
            alt={pokemonData.name}
          />
          <p>EXP: {pokemonData.base_experience}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonSmall;
