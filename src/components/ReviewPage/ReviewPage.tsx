import React from "react";
import { Pokemon, PokemonGameStats } from "../../types";
import { PokemonReviewCard } from "./PokemonReviewCard";
import { PokemonCardList } from "../Common/PokemonCardList";

export interface ReviewPageProps {
    pokemons: Pokemon[];
    gameStats: PokemonGameStats;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({ pokemons, gameStats }) => {
    const [selectedPokemon, setSelectedPokemon] = React.useState<Pokemon>();
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <PokemonCardList pokemons={pokemons} selectedPokemon={selectedPokemon} onPokemonSelect={
                (pokemon: Pokemon) => {
                    if (selectedPokemon === pokemon) {
                        setSelectedPokemon(undefined);
                        return;
                    }
                    setSelectedPokemon(pokemon);
                }
            } />
            <PokemonReviewCard pokemon={selectedPokemon} gameStats={gameStats} />
        </div>
    );
}