import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';

export interface PokemonCardProps {
    pokemon: Pokemon,
    onPokemonSelect?: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
    pokemon,
    onPokemonSelect,
}) => {
    const pokemonSelect = () => {
        if (onPokemonSelect) {
            onPokemonSelect(pokemon);
        }
    }
            
    const name = pokemon.name;
    const image = pokemon.sprites.front_default;

    return (                    
            <div className='card'>
                <h4> {name} </h4>
                {image ? <img src={image} alt={name} width="50" height="50" onClick={pokemonSelect} /> : null}
            </div>        
    );
}