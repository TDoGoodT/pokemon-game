import './App.css'
import React from 'react'
import { Ability, Pokemon, PokemonGameStats, Type } from './types';
import { PokemonGame } from './components/PokemonGame';
import { POKEMON_API, NUM_OF_POKEMON, POKEMON_LIMIT } from './app-constants';
import { Loading } from './components/Common/Loading';
import { PokemonBattleStats } from './components/BattlePage/Battle';


function getEffectivePower(power: number, pokemonStats: PokemonBattleStats, opponentStats: PokemonBattleStats): number {
  return (power + pokemonStats.attack) * pokemonStats.typeFactor - opponentStats.defense
}


function getTypeFactor(attacker: Type, defender: Type): number {
  const attackerDoubleDamageTo = attacker.damage_relations.double_damage_to.map(type => type.name);
  const attackerHalfDamageTo = attacker.damage_relations.half_damage_to.map(type => type.name);
  const attackerNoDamageTo = attacker.damage_relations.no_damage_to.map(type => type.name);
  const doubleDamage = attackerDoubleDamageTo.some(type => defender.name === type);
  const halfDamage = attackerHalfDamageTo.some(type => defender.name === type);
  const noDamage = attackerNoDamageTo.some(type => defender.name === type);
  if (doubleDamage) {
    return 2;
  }
  if (halfDamage) {
    return 0.5;
  }
  if (noDamage) {
    return 0;
  }
  return 1;
}
function loadAttacks(pokemon: Pokemon, pokemonStats: PokemonBattleStats, opponentStats: PokemonBattleStats): Promise<Ability[]> {
  if (pokemon.moves === undefined || pokemon.moves === null) {
    throw new Error("Pokemon has no moves");
  }
  return Promise.all(pokemon.moves
    .sort(() => Math.random() - Math.random())
    .slice(0, 4)
    .map((move) => {
      const attackUrl = move.move.url;
      return fetch(attackUrl)
        .then(response => response.json())
        .then((attack: Ability) => {
          attack.effectivePower = getEffectivePower(attack.power, pokemonStats, opponentStats)
          return attack;
        });
    }
    )
  );
}
function fetchType(typeUrl: string): Promise<Type> {
  return fetch(typeUrl)
    .then(response => response.json())
    .then((type: Type) => type);
}

function getBattleInfo(pokemon: Pokemon, opponent: Pokemon): Promise<BattleInfo> {
  if (pokemon.types === undefined || pokemon.types === null) {
    throw new Error("Pokemon has no types");
  }
  if (opponent.types === undefined || opponent.types === null) {
    throw new Error("Opponent has no types");
  }
  if (pokemon.stats === undefined || pokemon.stats === null) {
    throw new Error("Pokemon has no stats");
  }
  if (opponent.stats === undefined || opponent.stats === null) {
    throw new Error("Opponent has no stats");
  }

  const pokemonType = fetchType(pokemon.types[0].type.url);
  const opponentType = fetchType(opponent.types[0].type.url);
  const pokemonAttack = pokemon.stats[1].base_stat;
  const pokemonDefense = pokemon.stats[2].base_stat;
  const opponentAttack = opponent.stats[1].base_stat;
  const opponentDefense = opponent.stats[2].base_stat;
  return Promise.all([pokemonType, opponentType])
    .then(([pokemonType, opponentType]) => {
      return {
        pokemon: {
          id: pokemon.id,
          attack: pokemonAttack,
          defense: pokemonDefense,
          typeFactor: getTypeFactor(pokemonType, opponentType)
        },
        opponent: {
          id: opponent.id,
          attack: opponentAttack,
          defense: opponentDefense,
          typeFactor: getTypeFactor(opponentType, pokemonType)
        }
      }
    })
}

const fetchPokemon: (index: number) => Promise<Pokemon> = async (index) => {
  if (index <= 0 || index >= POKEMON_LIMIT) {
    throw new Error("Invalid index" + index);
  }
  let tries = 10;
  while (tries > 0) {
    try {
      const response = await fetch(POKEMON_API + index);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    tries--;
    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

const saveContext: (pokemon: Pokemon[], gameStats: PokemonGameStats) => void = (pokemon, gameStats) => {
  const context = { pokemon, gameStats };
  localStorage.setItem('pokemon-state', JSON.stringify(context));
}

const loadContext: () => any = () => {
  const context = localStorage.getItem('pokemon-state');
  if (context === null) {
    return null;
  }
  const json = JSON.parse(context);
  return json;
}

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);
  const [gameStats, setGameStats] = React.useState<PokemonGameStats>({ wins: 0, losses: 0, pokemon: {} });
  const [pageNumber, setPageNumber] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    const context = loadContext();
    if (context !== null && context !== undefined && context.pokemon !== undefined && context.pokemon.length > 0) {
      setPokemon(context.pokemon);
      setGameStats(context.gameStats);
      setLoading(false);
      return;
    }
    const randomIndecies = Array.from(Array(POKEMON_LIMIT).keys()).sort(() => Math.random() - 0.5).slice(0, NUM_OF_POKEMON);
    Promise.all(randomIndecies.map((index) => fetchPokemon(index)))
      .then((data) => {
        setPokemon(data);
        const newGameStats: PokemonGameStats = { wins: 0, losses: 0, pokemon: {} };
        data.forEach((pokemon) => {
          newGameStats.pokemon[pokemon.id] = { wins: 0, losses: 0 };
        });
        setGameStats(newGameStats);
      }).then(() => {
        setLoading(false);
      }
    );
  }, []);


  React.useEffect(() => {
    if (!loading) {
      saveContext(pokemon, gameStats);
    }
  }, [loading, pokemon, gameStats]);

  const resetGame = () => {
    setLoading(true);
    setPokemon([]);
    setGameStats({ wins: 0, losses: 0, pokemon: {} });
    const randomIndecies = Array.from(Array(POKEMON_LIMIT - 1).keys()).map(i => i + 1).sort(() => Math.random() - 0.5).slice(0, NUM_OF_POKEMON);
    console.log(randomIndecies)
    Promise.all(randomIndecies.map((index) => fetchPokemon(index)))
      .then((data) => {
        setPokemon(data);
        const newGameStats: PokemonGameStats = { wins: 0, losses: 0, pokemon: {} };
        data.forEach((pokemon) => {
          newGameStats.pokemon[pokemon.id] = { wins: 0, losses: 0 };
        });
        setGameStats(newGameStats);
      }).then(() => {
        setLoading(false);
      }
      );
  }

  const fetchRandomPokemon: (amount: number) => Promise<Pokemon[]> = (amount) => {
    const randomIndecies = Array.from(Array(POKEMON_LIMIT - 1).keys()).map(i => i + 1).sort(() => Math.random() - 0.5).slice(0, amount);
    setLoading(true);
    return Promise.all(randomIndecies.map((index) => {
      return fetchPokemon(index)
    })).then((data) => {
      setLoading(false);
      return data;
    });
  }

  const fetchAttacks: (pokemon: Pokemon, opponent: Pokemon) => Promise<[Ability[], Ability[]]> = async (pokemon, opponent) => {
    setLoading(true);
    return getBattleInfo(pokemon, opponent).then((battleInfo) => {
      return Promise.all([
        loadAttacks(pokemon, battleInfo.pokemon, battleInfo.opponent),
        loadAttacks(opponent, battleInfo.opponent, battleInfo.pokemon)
      ]).then(([pokemonAttacks, opponentAttacks]) => {
        setLoading(false);
        return [pokemonAttacks, opponentAttacks];
      });
    });
  }

  return (
    <div className='app-container' style={{ pointerEvents: loading ? 'none' : 'auto' }}>
      <link href="https://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet"></link>
      <PokemonGame pokemons={pokemon} fetchRandomPokemon={fetchRandomPokemon} fetchAttacks={fetchAttacks} startOver={resetGame} gameStats={gameStats} setGameStats={setGameStats} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      {loading && <Loading />}
    </div>
  );
}

export default App;
