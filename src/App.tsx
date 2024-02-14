import './App.css'
import { Header } from './components/AppHeader/Header';
import { PageLayout } from './components/Pages/PageLayout';
import React, { useState, useEffect } from 'react';
import { Pokemon } from './types.tsx';
import { POKEMON_LIMIT, POKEMON_API, BATTLE_PAGE, NUM_OF_POKEMON, FIGHT_PAGE } from './app-constants';


function App() {
  console.log('App')
  const [page, setPage] = React.useState<number>(0);
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedPokemon, setSelectedPokemon] = React.useState<Pokemon | null>(null);
  const [fightingPokemon, setFightingPokemon] = React.useState<Pokemon>();
  const [opponentPokemon, setOpponentPokemon] = React.useState<Pokemon>();

  const startBattle: () => void = () => {
    setPage(BATTLE_PAGE)
  }

  const startFight: (pokemon: Pokemon, opponent: Pokemon) => void = (pokemon, opponent) => {
    console.log('Fight started:', pokemon.name, 'vs', opponent.name);
    setFightingPokemon(pokemon);
    setOpponentPokemon(opponent);
    setPage(FIGHT_PAGE);
  }

  const onPokemonSelect: (pokemon: Pokemon) => void = (pokemon) => {
    console.log('Selected pokemon:', pokemon.name);
    setSelectedPokemon(pokemon);
  }


  const fetchPokemon: (index: number) => Promise<Pokemon> = async (index) => {
    try {
      console.log("Fetching data...")
      const response = await fetch(POKEMON_API + index);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  const saveState: () => void = () => {
    const state = { pokemons, page, selectedPokemon, loading };
    console.log('Saving state:', state);
    localStorage.setItem('app-state', JSON.stringify(state));
  }

  const loadState: () => any = () => {
    const state = localStorage.getItem('app-state');
    if (state === null) {
      return null;
    }
    console.log('Loaded state:', state);
    return JSON.parse(state);
  }
  const startOver: () => void = () => {
    setPage(0);
    setSelectedPokemon(null);
    setLoading(true);
    const randomIndecies = Array.of();
    while (randomIndecies.length < NUM_OF_POKEMON) {
      const randomIndex = Math.floor(Math.random() * POKEMON_LIMIT);
      if (randomIndecies.indexOf(randomIndex) === -1) {
        randomIndecies.push(randomIndex);
      }
    }
    Promise.all(randomIndecies.map((index) => fetchPokemon(index)))
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      });
  }
  useEffect(() => {
    if (!loading) {
      saveState();
    }
  }, [loading]);
  useEffect(() => {
    const state = loadState();
    if (state === null || state.pokemons.length === 0) {
      startOver();
    } else {
      setPokemons(state.pokemons);
      setPage(state.page);
      setSelectedPokemon(state.selectedPokemon);
      setLoading(state.loading);
    }
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div className="root">
      <Header startOver={startOver} loading={loading} />
      <PageLayout page={page} pokemons={pokemons} loading={loading} onPokemonSelect={onPokemonSelect} selectedPokemon={selectedPokemon} startBattle={startBattle} fetchPokemon={fetchPokemon} startFight={startFight} fightingPokemon={fightingPokemon} opponentPokemon={opponentPokemon} />
    </div>
  );
}

export default App;
