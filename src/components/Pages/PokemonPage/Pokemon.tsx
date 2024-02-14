import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from './PokemonCard';

export interface PokemonPageProps {
    pokemons: Pokemon[];
    loading: boolean;
    selectedPokemon?: Pokemon;
    onPokemonSelect?: (pokemon: Pokemon) => void;
    startBattle: () => void;
}

export const PokemonPage: React.FC<PokemonPageProps> = ({
    pokemons,
    loading,
    selectedPokemon,
    onPokemonSelect,
    startBattle
}) => {
    if (loading) {
        return <div>Loading...</div>
    }
    return (

        <div className='pokemon-page-container'>
            <div className='pokemon-page-container'>
                <div className='pokemon-page-container-child'>
                    {pokemons.map((pokemon, index) => {
                        return <PokemonCard key={index} pokemon={pokemon} onPokemonSelect={onPokemonSelect} />
                    }
                    )}
                </div>
                <div className='pokemon-page-container-child'>
                    <h2> {selectedPokemon ? selectedPokemon.name : "No pokemon selected"} </h2>
                </div>
            </div>
            <div className='pokemon-page-container'>
                <button onClick={startBattle}>Let's Battle</button>
            </div>
        </div>
    );
}