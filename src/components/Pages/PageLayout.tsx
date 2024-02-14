import React from 'react';
import '../../App.css';
import { Pokemon } from '../../types';
import { Battle } from './BattlePage/Battle';
import { PokemonPage } from './PokemonPage/Pokemon';
import { Fight } from './FightPage/Fight';

export interface PageLayoutProps {
    page: number;
    pokemons: Pokemon[];
    loading: boolean;
    onPokemonSelect?: (pokemon: Pokemon) => void;
    selectedPokemon?: Pokemon;
    startBattle: () => void;
    startFight: (pokemon: Pokemon, opponent: Pokemon) => void;
    fetchPokemon: (id: number) => Promise<Pokemon>;
    fightingPokemon?: Pokemon;
    opponentPokemon?: Pokemon;
}
export const PageLayout: React.FC<PageLayoutProps> = ({
    page,
    pokemons,
    loading,
    onPokemonSelect,
    selectedPokemon,
    startBattle,
    startFight,
    fetchPokemon,
    fightingPokemon,
    opponentPokemon
}) => {
    switch(page) {
        case 0:
            return <PokemonPage pokemons={pokemons} loading={loading} onPokemonSelect={onPokemonSelect} selectedPokemon={selectedPokemon} startBattle={startBattle}/>            
        case 1:
            return <Battle pokemons={pokemons} fetchPokemon={fetchPokemon} startFight={startFight}/>
        case 2:
            if (!fightingPokemon || !opponentPokemon) {
                throw new Error('fightingPokemon and opponentPokemon must be defined');
            }
            return <Fight pokemon={fightingPokemon} opponent={opponentPokemon}/>
        default:
            return null;

    }
}