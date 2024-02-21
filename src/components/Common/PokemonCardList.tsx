import React from "react";
import { Pokemon } from "../../types";
import { PokemonCard } from "./PokemonCard";

export interface PokemonCardListProps {
    pokemons: Pokemon[];
    asRow?: boolean;
    textStyle?: string | null;
    onPokemonSelect?: (pokemon: Pokemon) => void;
    selectedPokemon?: Pokemon;
    disabled?: Pokemon[];
    selectable?: boolean;
}

export const PokemonCardList: React.FC<PokemonCardListProps> = ({
    pokemons,
    asRow = false,
    textStyle = "none",
    onPokemonSelect,
    selectedPokemon,
    disabled,
    selectable = true
}) => {
    return (
        <div className={selectable ? "container" : ""} style={{display: "flex", flexDirection: asRow ? "row" : "column", justifyContent: "center", alignItems: "center"}}>
            {pokemons.map((pokemon, index) => <PokemonCard key={index} pokemon={pokemon} onPokemonSelect={onPokemonSelect} shouldShowName={textStyle!=="none"} nameLocation={textStyle ? textStyle : "bottom"} isHighlighted={selectedPokemon ? selectedPokemon.id === pokemon.id : false} disabled={disabled?.some(p => p ? p.id === pokemon.id : false)} />)}
        </div>
    );
}