import React from 'react';
import '../../../App.css';
import { Pokemon } from '../../../types';
import { PokemonCard } from '../PokemonPage/PokemonCard';
import { NUM_OF_POKEMON, POKEMON_LIMIT } from '../../../app-constants';
export interface BattleProps {
    pokemons: Pokemon[];
    fetchPokemon: (id: number) => Promise<Pokemon>;
    startFight: (pokemon: Pokemon, opponent: Pokemon) => void;
}
export const Battle: React.FC<BattleProps> = ({
    pokemons,
    fetchPokemon,
    startFight
}) => {
    const selectedOpponentPokemon = pokemons[Math.floor(Math.random() * NUM_OF_POKEMON)];
    const [opponentPokemons, setOpponentPokemons] = React.useState<Pokemon[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const indecies = Array.from(Array(POKEMON_LIMIT).keys()).filter((index) => pokemons.findIndex((pokemon) => pokemon.id === index) === -1);
        const randomIndecies = Array.of<number>();
        while (randomIndecies.length < NUM_OF_POKEMON) {
            const randomIndex = indecies[Math.floor(Math.random() * indecies.length)];
            if (randomIndecies.indexOf(randomIndex) === -1) {
                randomIndecies.push(randomIndex);
            }
        }
        Promise.all(randomIndecies.map((index) => fetchPokemon(index)))
            .then((data) => { setOpponentPokemons(data); setLoading(false); });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className='battle-page-container'>
            <div className='battle-page-container-child'>
                {pokemons.map((pokemon, index) => {
                    return <PokemonCard key={index} pokemon={pokemon} onPokemonSelect={() => { }} />
                }
                )}
            </div>
            <div className='battle-page-container-child'>
                {opponentPokemons.map((pokemon, index) => {
                    return <PokemonCard key={index} pokemon={pokemon} onPokemonSelect={(opponent: Pokemon) => {startFight(selectedOpponentPokemon, opponent)}} />
                }
                )}
            </div>
        </div>

    )
}