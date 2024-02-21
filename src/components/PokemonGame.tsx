import React, { useEffect } from "react";
import { Ability, Pokemon, PokemonGameStats } from "../types";
import { BattleMainPage } from "./BattlePage/BattleMainPage";
import { ReviewPage } from "./ReviewPage/ReviewPage";
import { Header } from "./Common/Header";
import { PlayerSummary } from "./ReviewPage/PlayerSummary";

export interface PokemonGameProps {
    pokemons: Pokemon[];
    fetchRandomPokemon: (amount: number) => Promise<Pokemon[]>;
    fetchAttacks: (pokemon: Pokemon, opponent: Pokemon) => Promise<[Ability[], Ability[]]>;
    startOver(): void;
    gameStats: PokemonGameStats;
    setGameStats: React.Dispatch<React.SetStateAction<PokemonGameStats>>;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}


export const PokemonGame: React.FC<PokemonGameProps> = ({
    pokemons,
    fetchRandomPokemon,
    fetchAttacks,
    startOver,
    gameStats,
    setGameStats,
    pageNumber,
    setPageNumber
}) => {

    const startBattle = () => {
        setPageNumber(1);
    }

    const endBattle = (winners: Pokemon[], losers: Pokemon[]) => {
        setGameStats((gameStats) => {
            const newGameStats = { ...gameStats };
            winners.forEach((winner) => {
                if (newGameStats.pokemon[winner.id] === undefined) {
                    newGameStats.pokemon[winner.id] = { wins: 0, losses: 0 };
                }
                newGameStats.pokemon[winner.id].wins++;
            });
            losers.forEach((loser) => {
                if (newGameStats.pokemon[loser.id] === undefined) {
                    newGameStats.pokemon[loser.id] = { wins: 0, losses: 0 };
                }
                newGameStats.pokemon[loser.id].losses++;
            });
            if (losers.length > winners.length) {
                newGameStats.losses++;
            } else {
                newGameStats.wins++;
            }
            return newGameStats;
        });
        setPageNumber(0);
    }
    switch (pageNumber) {
        case 0:
            return <div className="app-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch' }}>
                <Header startOver={startOver} />
                <ReviewPage pokemons={pokemons} gameStats={gameStats} />
                <button onClick={startBattle} >Start Battle</button>
                <PlayerSummary wins={gameStats.wins} rounds={gameStats.wins + gameStats.losses} />
            </div>
        case 1:
            return <div className="app-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <BattleMainPage pokemon={pokemons} fetchRandomPokemon={fetchRandomPokemon} fetchAttacks={fetchAttacks} finishBattle={endBattle} />
            </div>
        default:
            return null;
    }
}