import React from 'react';
import '../../App.css';
import { Pokemon } from '../../types';

export interface PokemonCardProps {
    pokemon?: Pokemon,
    onPokemonSelect?: (pokemon: Pokemon) => void;
    shouldShowName?: boolean;
    nameLocation?: string;
    isHighlighted?: boolean;
    disabled?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
    pokemon,
    onPokemonSelect = () => {},
    shouldShowName = false,
    nameLocation = "bottom",
    isHighlighted = false,
    disabled = false
}) => {
    if (pokemon === undefined || pokemon == null) {
        return <div className='container'>Loading...</div>
    }
    const name = pokemon.name;
    const image = pokemon.sprites.front_default;

    const className = disabled ? "disabled" : "container";
    return (
        <div className={className} onClick={disabled ? () => {} : () => {onPokemonSelect(pokemon)}} style={{ border: isHighlighted ? "1px solid white" : "" }}>
            {shouldShowName && nameLocation === "top" ? name : null}
            {image ? <img className='image' src={image} alt={name} width={"50%"} style={{ minWidth: "100px" }} /> : null}
            {shouldShowName && nameLocation === "bottom" ? name : null}
        </div>
    );
}