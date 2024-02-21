import React, { useEffect } from "react";
import { Ability, Pokemon } from "../../types";
import { BattleSelect } from "./BattleSelect";
import { Battle, BattleStats } from "./Battle";

export interface BattleMainPageProps {
    pokemon: Pokemon[];
    fetchRandomPokemon: (amount: number) => Promise<Pokemon[]>;
    fetchAttacks: (pokemon: Pokemon, opponent: Pokemon) => Promise<[Ability[], Ability[]]>;
    finishBattle: (winners: Pokemon[], losers: Pokemon[]) => void;
}
export const BattleMainPage: React.FC<BattleMainPageProps> = ({
    pokemon,
    fetchRandomPokemon,
    fetchAttacks,
    finishBattle,
}) => {
    const [opponents, setOpponents] = React.useState<Pokemon[]>([]);
    const [opponent, setOpponent] = React.useState<Pokemon>();
    const [selectedPokemon, setSelectedPokemon] = React.useState<Pokemon>();
    const [startBattle, setStartBattle] = React.useState(false);
    const [epoch, setEpoch] = React.useState(0);
    const [playedPokemon, setPlayedPokemon] = React.useState<Pokemon[]>([]);
    const [playedOpponents, setPlayedOpponents] = React.useState<Pokemon[]>([]);
    const [winners, setWinners] = React.useState<Pokemon[]>([]);
    const [losers, setLosers] = React.useState<Pokemon[]>([]);
    const [battleDone, setBattleDone] = React.useState(false);
    useEffect(() => {
        fetchRandomPokemon(3).then((opponents) => {
            setOpponents(opponents);
        })
    }, []);


    useEffect(() => {
        setPlayedPokemon((playedPokemon) => [...playedPokemon, selectedPokemon!]);
        setPlayedOpponents((playedOpponents) => [...playedOpponents, opponent!]);
        setOpponent(undefined);
        setSelectedPokemon(undefined);
        setStartBattle(false);
        if (winners.length + losers.length == 3) {
            setBattleDone(true);
        }
    }, [epoch]);

    const finishRound = (battleStats: BattleStats) => {
        if (battleStats.winner) {
            setWinners((winners) => [...winners, battleStats.pokemon]);
        } else {
            setLosers((losers) => [...losers, battleStats.pokemon]);
        }
        setEpoch(epoch + 1);
    }

    const getWinner: () => boolean = () => {
        return winners.length >= 2;
    }

    return startBattle ? (
        <Battle pokemon={selectedPokemon} opponent={opponent} fetchAttacks={fetchAttacks} finishRound={finishRound} />
    ) : (
        <BattleSelect pokemons={pokemon} opponents={opponents} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} setStartBattle={setStartBattle} setOpponent={setOpponent} playedPokemon={playedPokemon} playedOpponents={playedOpponents} finishBattle={() => {finishBattle(winners, losers)}} done={battleDone} getWinner={getWinner}/>)

}