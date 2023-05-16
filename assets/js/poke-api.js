const pokeApi = {};

function getPokemonDetails(jsonResponse) {
  return JSON.stringify({
    name: {
      en: jsonResponse.name,
      jp: jsonResponse.names[0].name, 
    },
    id: jsonResponse.id,
    types: jsonResponse.types.map((typeSlot) => typeSlot.type.name),
    spriteUrl: jsonResponse.sprites.other["official-artwork"].front_default,
    stats: {
      hp: jsonResponse.stats[0].base_stat,
      atk: jsonResponse.stats[1].base_stat,
      def: jsonResponse.stats[2].base_stat,
      spAtk: jsonResponse.stats[3].base_stat,
      spDef: jsonResponse.stats[4].base_stat,
      spd: jsonResponse.stats[5].base_stat,
    },
  });
}
let JSONRESP;
pokeApi.fetchPokemonDetails = (pokemon) => {
  
  let pokemonDetails;
  let pokemonSpeciesDetail;

  return fetch(pokemon.url)
    .then((response) => response.json())
    .then((json) => {pokemonDetails = json; return fetch(json.species.url)})
    .then((response) => response.json())
    .then((json) => pokemonSpeciesDetail = json)
    .then(() => JSONRESP=getPokemonDetails({...pokemonDetails, ...pokemonSpeciesDetail}));
};

pokeApi.fetchPokemonJsons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.fetchPokemonDetails))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};
