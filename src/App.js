import React, { useEffect, useState } from "react";
import pokedex from "./img/pokedex.png";
import logo from "./img/Pokédex_logo.png";
import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(1);
  const [query, setQuery] = useState("1");

  const getPokemon = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}${index}`);
      const { id, name } = response.data;
      const img =
        response.data.sprites.versions["generation-viii"].icons.front_default;

      console.log(response);
      setPokemon({ id: id, name: name, image: img });
      setIndex(id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    setIndex(index + 1);

    console.log(index);
  };
  const handlePrev = () => {
    setIndex(index - 1);

    console.log(index);
  };

  useEffect(() => {
    getPokemon();
  }, [index]);

  return (
    <>
      <img src={logo} alt="logo" className="title" />
      <main className="pokedex-body">
        <img src={pokedex} className="pokedex-img" />
        {!loading ? (
          <img src={pokemon.image} alt={pokemon.name} className="pokemon-img" />
        ) : (
          <img src="" className="pokemon-img" />
        )}
        <div className="pokemon-name">
          {!loading ? <h1>{pokemon.name}</h1> : <h1>Loading...</h1>}
        </div>
        <button type="button" className="btn-prev" onClick={handlePrev}>
          Prev
        </button>
        <button type="button" className="btn-next" onClick={handleNext}>
          Next
        </button>
      </main>
    </>
  );
}

export default App;
