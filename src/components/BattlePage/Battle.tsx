import React, { useEffect } from "react";
import { Ability, Pokemon } from "../../types";
import { PokemonCard } from "../Common/PokemonCard";
import { AttacksCard } from "./AttacksCard";
import { BattleReviewCard } from "./BattleReviewCard";


export interface AttackInfo {
    name: string;
    damage: number;
}


export interface BattleStats {
    winner: boolean;
    pokemon: Pokemon;
}

export interface BattleReview {
    pokemonAttack: Ability;
    opponentAttack: Ability;
}
export interface BattleProps {
    pokemon?: Pokemon;
    opponent?: Pokemon;
    fetchAttacks: (pokemon: Pokemon, opponent: Pokemon) => Promise<[Ability[], Ability[]]>;
    finishRound: (battleStats: BattleStats) => void;
}

export const Battle: React.FC<BattleProps> = ({
    pokemon,
    opponent,
    fetchAttacks,
    finishRound,
}) => {
    const [attacks, setAttacks] = React.useState<Ability[]>([]);
    const [opponentAttacks, setOpponentAttacks] = React.useState<Ability[]>([]);
    const [battleReview, setBattleReview] = React.useState<BattleReview>();
    const [battleStats, setBattleStats] = React.useState<BattleStats>();
    if (pokemon === undefined || pokemon === null || opponent === undefined || opponent === null) {
        return null;
    }
    useEffect(() => {
        fetchAttacks(pokemon, opponent)
            .then(([pokemonAttacks, opponentAttacks]) => {
                setAttacks(pokemonAttacks);
                setOpponentAttacks(opponentAttacks);
            })
    }, []);

    const stepBattle = (attack: Ability) => {
        if (battleStats) {
            return
        }
        const randomIndex = Math.floor(Math.random() * opponentAttacks.length);
        const opponentAttack = opponentAttacks[randomIndex];
        setBattleReview({ pokemonAttack: attack, opponentAttack: opponentAttack });
        if (getWinner(attack, opponentAttack) === 1) {
            setBattleStats({ winner: true, pokemon: pokemon });
        } else {
            setBattleStats({ winner: false, pokemon: pokemon });
        }
    }
    const nextRound = () => {
        finishRound(battleStats!);
    }
    return (
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                <AttacksCard attacks={opponentAttacks} />
                <PokemonCard pokemon={opponent} />
            </div>
            <BattleReviewCard battleReview={battleReview} nextRound={nextRound} battleStats={battleStats} />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                <PokemonCard pokemon={pokemon} />
                <AttacksCard attacks={attacks} onSelectedAttack={stepBattle} />
            </div>
        </div>
    )
}


function getWinner(attack1: Ability, attack2: Ability): number {
    return attack1.effectivePower >= attack2.effectivePower ? 1 : 2;
}



