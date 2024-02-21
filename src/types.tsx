export interface PokemonStats {
  wins: number;
  losses: number;
}

export interface PokemonGameStats {
  wins: number;
  losses: number;
  pokemon: { [id: number]: PokemonStats };
}


export interface PokemonBattleResults {
  pokemon: Pokemon;
  opponent: Pokemon;
  winner: Pokemon;
}


export interface Ability {
  name: string;
  power: number;
  effectivePower: number;
}

export interface Pokemon {
    abilities?: (AbilitiesEntity)[] | null;
    base_experience: number;
    cries: Cries;
    forms?: (AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies)[] | null;
    game_indices?: (GameIndicesEntity)[] | null;
    height: number;
    held_items?: (null)[] | null;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves?: (MovesEntity)[] | null;
    name: string;
    order: number;
    past_abilities?: (null)[] | null;
    past_types?: (null)[] | null;
    species: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
    sprites: Sprites;
    stats?: (StatsEntity)[] | null;
    types?: (TypesEntity)[] | null;
    weight: number;
  }
  export interface AbilitiesEntity {
    ability: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
    is_hidden: boolean;
    slot: number;
  }
  export interface AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies {
    name: string;
    url: string;
  }
  export interface Cries {
    latest: string;
    legacy: string;
  }
  export interface GameIndicesEntity {
    game_index: number;
    version: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  }
  export interface MovesEntity {
    move: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
    version_group_details?: (VersionGroupDetailsEntity)[] | null;
  }
  export interface VersionGroupDetailsEntity {
    level_learned_at: number;
    move_learn_method: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
    version_group: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  }
  export interface Sprites {
    back_default: string;
    back_female?: null;
    back_shiny: string;
    back_shiny_female?: null;
    front_default: string;
    front_female?: null;
    front_shiny: string;
    front_shiny_female?: null;
    other: Other;
    versions: Versions;
  }
  export interface Other {
    dream_world: DreamWorldOrIcons;
    home: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
    officialartwork: OfficialartworkOrEmerald;
    showdown: ShowdownOrDiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
  }
  export interface DreamWorldOrIcons {
    front_default: string;
    front_female?: null;
  }
  export interface HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon {
    front_default: string;
    front_female?: null;
    front_shiny: string;
    front_shiny_female?: null;
  }
  export interface OfficialartworkOrEmerald {
    front_default: string;
    front_shiny: string;
  }
  export interface ShowdownOrDiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated {
    back_default: string;
    back_female?: null;
    back_shiny: string;
    back_shiny_female?: null;
    front_default: string;
    front_female?: null;
    front_shiny: string;
    front_shiny_female?: null;
  }
  export interface Versions {
    generationi: Generationi;
    generationii: Generationii;
    generationiii: Generationiii;
    generationiv: Generationiv;
    generationv: Generationv;
    generationvi: Generationvi;
    generationvii: Generationvii;
    generationviii: Generationviii;
  }
  export interface Generationi {
    redblue: RedblueOrYellow;
    yellow: RedblueOrYellow;
  }
  export interface RedblueOrYellow {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
  }
  export interface Generationii {
    crystal: Crystal;
    gold: GoldOrSilver;
    silver: GoldOrSilver;
  }
  export interface Crystal {
    back_default: string;
    back_shiny: string;
    back_shiny_transparent: string;
    back_transparent: string;
    front_default: string;
    front_shiny: string;
    front_shiny_transparent: string;
    front_transparent: string;
  }
  export interface GoldOrSilver {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent: string;
  }
  export interface Generationiii {
    emerald: OfficialartworkOrEmerald;
    fireredleafgreen: FireredleafgreenOrRubysapphire;
    rubysapphire: FireredleafgreenOrRubysapphire;
  }
  export interface FireredleafgreenOrRubysapphire {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  }
  export interface Generationiv {
    diamondpearl: ShowdownOrDiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
    heartgoldsoulsilver: ShowdownOrDiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
    platinum: ShowdownOrDiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
  }
  export interface Generationv {
    blackwhite: Blackwhite;
  }
  export interface Blackwhite {
    animated: ShowdownOrDiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
    back_default: string;
    back_female?: null;
    back_shiny: string;
    back_shiny_female?: null;
    front_default: string;
    front_female?: null;
    front_shiny: string;
    front_shiny_female?: null;
  }
  export interface Generationvi {
    omegarubyalphasapphire: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
    xy: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
  }
  export interface Generationvii {
    icons: DreamWorldOrIcons;
    ultrasunultramoon: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
  }
  export interface Generationviii {
    icons: DreamWorldOrIcons;
  }
  export interface StatsEntity {
    base_stat: number;
    effort: number;
    stat: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  }
  export interface TypesEntity {
    slot: number;
    type: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  }

export interface Type {
  damage_relations: DamageRelations
  game_indices: Index[]
  generation: Generation2
  id: number
  move_damage_class: MoveDamageClass
  moves: Mfe[]
  name: string
  names: Name[]
  past_damage_relations: any[]
  pokemon: Pokemon[]
}

export interface DamageRelations {
  double_damage_from: DoubleDamageFrom[]
  double_damage_to: DoubleDamageTo[]
  half_damage_from: HalfDamageFrom[]
  half_damage_to: HalfDamageTo[]
  no_damage_from: any[]
  no_damage_to: any[]
}

export interface DoubleDamageFrom {
  name: string
  url: string
}

export interface DoubleDamageTo {
  name: string
  url: string
}

export interface HalfDamageFrom {
  name: string
  url: string
}

export interface HalfDamageTo {
  name: string
  url: string
}

export interface Index {
  game_index: number
  generation: Generation
}

export interface Generation {
  name: string
  url: string
}

export interface Generation2 {
  name: string
  url: string
}

export interface MoveDamageClass {
  name: string
  url: string
}

export interface Mfe {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface Pokemon {
  pokemon: Pokemon2
  slot: number
}

export interface Pokemon2 {
  name: string
  url: string
}
