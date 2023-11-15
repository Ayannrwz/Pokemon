import { useEffect, useState } from "react";
import PokemonDetails from "./pokemon_details";
import "../Styles/pokemon.css";
import PokemonSmall from "./pokemon_small";
import Versus from "../assets/Images/versus.png";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [teamRocket, setTeamRocket] = useState([]);
  const [teamAsh, setTeamAsh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [ashPower, setAshPower] = useState(0);
  const [rocketPower, setRocketPower] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const [ashScore, setAshScore] = useState(0);
  const [rocketScore, setRocketScore] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const data = await response.json();
        setPokemonList(data.results);
        // const tempPokemonList = [...data.results];
        // const selectedPokemons = [];
        // for (let i = 0; i < 16; i++) {
        //   const randIndex = Math.floor(Math.random() * tempPokemonList.length);
        //   const selectedPokemon = tempPokemonList.splice(randIndex, 1)[0];
        //   selectedPokemons.push(selectedPokemon);
        // }

        // const half = Math.ceil(selectedPokemons.length / 2);
        // let teamAshPokemons = selectedPokemons.splice(0, half);
        // let teamRocketPokemons = selectedPokemons;

        // let ashPowerTemp = 0;
        // let rocketPowerTemp = 0;

        // for (var i = 0; i < teamRocketPokemons.length; i++) {
        //   const ashResponse = await fetch(teamAshPokemons[i].url);
        //   const rocketResponse = await fetch(teamRocketPokemons[i].url);

        //   const ashData = await ashResponse.json();
        //   const rocketData = await rocketResponse.json();

        //   ashPowerTemp += ashData.base_experience;
        //   rocketPowerTemp += rocketData.base_experience;
        // }

        // setAshPower(ashPowerTemp);
        // setRocketPower(rocketPowerTemp);
        // setTeamAsh(teamAshPokemons);
        // setTeamRocket(teamRocketPokemons);
        setFilteredPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    setTeamAsh([]);
    setTeamRocket([]);
    const refresh = async () => {
      const tempPokemonList = [...pokemonList];
      const selectedPokemons = [];
      for (let i = 0; i < 16; i++) {
        const randIndex = Math.floor(Math.random() * tempPokemonList.length);
        const selectedPokemon = tempPokemonList.splice(randIndex, 1)[0];
        selectedPokemons.push(selectedPokemon);
      }

      const half = Math.ceil(selectedPokemons.length / 2);
      let teamAshPokemons = selectedPokemons.splice(0, half);
      let teamRocketPokemons = selectedPokemons;

      let ashPowerTemp = 0;
      let rocketPowerTemp = 0;

      for (var i = 0; i < teamAshPokemons.length; i++) {
        const ashResponse = await fetch(teamAshPokemons[i].url);
        const rocketResponse = await fetch(teamRocketPokemons[i].url);

        const ashData = await ashResponse.json();
        const rocketData = await rocketResponse.json();

        ashPowerTemp += ashData.base_experience;
        rocketPowerTemp += rocketData.base_experience;
      }

      if (ashPowerTemp > rocketPowerTemp) {
        setAshScore((prevAshScore) => prevAshScore + 1);
      } else {
        setRocketScore((prevRocketScore) => prevRocketScore + 1);
      }

      setAshPower(ashPowerTemp);
      setRocketPower(rocketPowerTemp);
      setTeamAsh(teamAshPokemons);
      setTeamRocket(teamRocketPokemons);

      console.log("render");
    };

    refresh();
  }, [refresh]);

  const refreshBattle = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleSearchChange = (e) => {
    setSearchPokemon(e.target.value);
    // setTimeout(() => {
    if (e.target.value == "") {
      setFilteredPokemonList(pokemonList);
    } else {
      const filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
      );
      setFilteredPokemonList(filteredList);
    }
    // }, 1000);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="container">
      <div>
        <input
          className="search"
          placeholder="Search Pokemon..."
          value={searchPokemon}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        <div className="col-md-5 team">
          <div className="team-name-container">
            <div
              className={`team-name-box-${
                ashPower > rocketPower ? "win" : "lose"
              }`}
            >
              <p className="team-name">Team Ash</p>
            </div>
          </div>
          <div className="battle-pokemons">
            <div className="row">
              {teamAsh.map((pokemon) => (
                <div key={pokemon.name} className="col-md-3">
                  <PokemonSmall pokemonUrl={pokemon.url} />
                </div>
              ))}{" "}
            </div>
          </div>
          <h2>EXP: {ashPower}</h2>
          <h1>Score: {ashScore}</h1>
        </div>
        <div className="col-md-2 text-center">
          {/* <h1 className="versus">VS</h1> */}
          <img className="versus" src={Versus} alt="VS" />
        </div>
        <div className="col-md-5 team">
          <div className="team-name-container">
            <div
              className={`team-name-box-${
                rocketPower > ashPower ? "win" : "lose"
              }`}
            >
              <p className="team-name">Team Rocket</p>
            </div>
          </div>
          <div className="battle-pokemons">
            <div className="row">
              {teamRocket.map((pokemon) => (
                <div key={pokemon.name} className="col-md-3">
                  <PokemonSmall pokemonUrl={pokemon.url} />
                </div>
              ))}
            </div>
          </div>
          <h2>EXP: {rocketPower}</h2>
          <h1>Score: {rocketScore}</h1>
        </div>
      </div>
      <div className="text-center">
        <button className="comic-button" onClick={refreshBattle}>
          {ashScore > 0 || rocketScore > 0 ? "Battle Again" : "Start Battle"}
        </button>
      </div>
      <div className="row list">
        {filteredPokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            className="col-md-3 d-flex justify-content-center"
          >
            <PokemonDetails pokemonUrl={pokemon.url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
