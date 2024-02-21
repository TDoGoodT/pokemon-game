import React from 'react';
import '../../App.css';
import { PokemonGameStats, Pokemon } from '../../types';

export interface PokemonReviewCardProps {
    pokemon?: Pokemon | null,
    gameStats: PokemonGameStats
}

export const PokemonReviewCard: React.FC<PokemonReviewCardProps> = ({
    pokemon,
    gameStats
}) => {
    if (pokemon === undefined || pokemon === null) {
        return <div className='review-card'>
            No Pokemon Selected
            </div>
    }
    const name = pokemon.name;

    const type = pokemon.types && pokemon.types[0].type.name;
    const weight = pokemon.weight;
    const height = pokemon.height;

    const majorInfo: { [key: string]: string } = {
        'Type': type!,
        'Weight': weight!.toString(),
        'Height': height!.toString()
    }

    const hp = pokemon.stats && pokemon.stats[0].base_stat;
    const attack = pokemon.stats && pokemon.stats[1].base_stat;
    const defense = pokemon.stats && pokemon.stats[2].base_stat;
    const specialAttack = pokemon.stats && pokemon.stats[3].base_stat;
    const specialDefense = pokemon.stats && pokemon.stats[4].base_stat;
    const speed = pokemon.stats && pokemon.stats[5].base_stat;

    const minorInfo: { [key: string]: number } = {
        'HP': hp!,
        'Attack': attack ? attack : 0,
        'Defense': defense!,
        'Special Attack': specialAttack!,
        'Special Defense': specialDefense!,
        'Speed': speed!
    }


    const wins = gameStats.pokemon[pokemon.id].wins;
    const losses = gameStats.pokemon[pokemon.id].losses;
    const winRate = wins / (wins + losses);

    return (
        <div className='review-card'>
            <div>
                <h3 style={{ textAlign: 'center' }}>{name.toUpperCase()}</h3>
                <div>
                    <ul className='review-card-list'>
                        {Object.keys(majorInfo).map((key, index) => {
                            return (
                                <li key={index}> {key}: {majorInfo[key]} </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <ul className='review-card-list'>
                        {Object.keys(minorInfo).map((key, index) => {
                            return (
                                <li key={index}> {key}: {minorInfo[key]} </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <div>
                    <ul className='review-card-list'>
                        <li> Wins: {wins} </li>
                        <li> Losses: {losses} </li>
                        {winRate.toString() !== "NaN" ? <li> Win Rate: {Math.floor(winRate*100) + "%"} </li> : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}