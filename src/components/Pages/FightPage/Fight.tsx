import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from '../PokemonPage/PokemonCard';

export interface FightProps {
    pokemon: Pokemon;
    opponent: Pokemon;
}
export const Fight: React.FC<FightProps> = ({
    pokemon,
    opponent
}) => {
    return (
        <div className='fight-page-container'>
            <div className='fight-page-container-child'>
                <PokemonCard pokemon={pokemon} onPokemonSelect={() => { }} />
            </div>
            <div className='fight-page-container-child'>
                <PokemonCard pokemon={opponent} onPokemonSelect={() => { }} />
            </div>
        </div>
    )

}