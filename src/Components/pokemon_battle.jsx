

function PokemonBattle({teamAsh, teamRocket, rocketPower, ashPower}) {
  return (
    <div>
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
          <div className="row">
            {teamAsh.map((pokemon) => (
              <div key={pokemon.name} className="col-md-3">
                <PokemonSmall pokemonUrl={pokemon.url} />
              </div>
            ))}{" "}
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
          <div className="row">
            {teamRocket.map((pokemon) => (
              <div key={pokemon.name} className="col-md-3">
                <PokemonSmall pokemonUrl={pokemon.url} />
              </div>
            ))}
          </div>
          <h2>EXP: {rocketPower}</h2>
          <h1>Score: {rocketScore}</h1>
        </div>
      </div>
      <div className="text-center">
        <button className="comic-button" onClick={refreshBattle}>
          Battle Again
        </button>
      </div>
    </div>
  );
}
export default PokemonBattle;
