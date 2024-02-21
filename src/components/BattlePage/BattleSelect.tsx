import React, { useEffect } from "react";
import { Pokemon, PokemonBattleResults } from "../../types";
import { PokemonCardList } from "../Common/PokemonCardList";
import { Done } from "./Done";

export interface BattleSelectProps {
    pokemons: Pokemon[];
    opponents: Pokemon[];
    selectedPokemon?: Pokemon;
    setSelectedPokemon: (pokemon: Pokemon) => void;
    setStartBattle: (startBattle: boolean) => void;
    setOpponent: (opponent: Pokemon) => void;
    playedPokemon: Pokemon[];
    playedOpponents: Pokemon[];
    done: boolean;
    finishBattle: () => void;
    getWinner: () => boolean;
}
export const BattleSelect: React.FC<BattleSelectProps> = ({
    pokemons,
    opponents,
    selectedPokemon,
    setSelectedPokemon,
    setStartBattle,
    setOpponent,
    playedPokemon,
    playedOpponents,
    done,
    finishBattle,
    getWinner
}) => {

    useEffect(() => {
        if (selectedPokemon === undefined) {
            return;
        }
        const playableOpponents = opponents.filter(p => !playedOpponents.some(po => po ? po.id === p.id : false));
        const randomIndex = Math.floor(Math.random() * playableOpponents.length);
        setOpponent(playableOpponents[randomIndex]);
        setStartBattle(true);
    }, [selectedPokemon]);


    return  (
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <PokemonCardList pokemons={opponents} asRow={true} onPokemonSelect={() => {}} textStyle="bottom" disabled={done ? opponents : playedOpponents} selectable={false} />
            {done ? <Done nextRound={finishBattle} winner={getWinner()} /> : null}
            <PokemonCardList pokemons={pokemons} asRow={true} onPokemonSelect={(pokemon: Pokemon) => {
                setSelectedPokemon(pokemon);
            } } textStyle="top" disabled={done ? pokemons : playedPokemon} selectable={!done} />
        </div>
    )

}