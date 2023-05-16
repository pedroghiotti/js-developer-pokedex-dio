const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const detailView = document.getElementById("detailView");
const detailViewReturnButton = document.getElementById("detailViewReturnButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function OpenDetailedView(id) {
  detailedView.OpenOnId(id);
}

function loadPokemon(offset, limit) {
  pokeApi.fetchPokemonJsons(offset, limit).then((pokemons = []) => {
    pokemonList.insertAdjacentHTML('beforeend', pokemons.map((pokemon)=>{
      return `<pokemon-card pokemonJson = ${pokemon}></pokemon-card>`;
    }).join(''));

    detailedView.pokemonList.insertAdjacentHTML('beforeend', pokemons.map((pokemon)=>{
      return `<pokemon-detail-card pokemonJson = ${pokemon}></pokemon-detail-card>`;
    }).join(''));
  });
}

function requestLoadPokemon() {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemon(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemon(offset, limit);
  }
}

loadMoreButton.addEventListener("click", requestLoadPokemon);

loadPokemon(offset, limit);
