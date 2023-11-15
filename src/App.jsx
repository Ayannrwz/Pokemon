import PokemonList from "./Components/pokemon_list"

function App() {

  return (
      <div className="container-fluid">
        <h1 className="text-center">Choose your Pokemon</h1>
        {/* <img src={logo} alt="Choose your pokemon"/> */}
        <PokemonList />
      </div>
  )
}

export default App
