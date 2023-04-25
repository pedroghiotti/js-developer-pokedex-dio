const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const detailView = document.getElementById("detailView");
const detailViewReturnButton = document.getElementById(
  "detailViewReturnButton"
);

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}
function convertPokemonToDetailedLi(pokemon) {
  return `
    <div class="listedDetails ${pokemon.type}">
    <span class="name">${pokemon.name}</span>
    <img src="${pokemon.photo}" alt="">
    <div class = "detailBlock">
        <div class="typesBlock">
            ${pokemon.types
              .map(
                (type) => `<div class="typeDetailedView ${type}">
            <div class="typeIcon ${type}Icon"></div>
            <span class="typeText">${type}</span>
        </div>`
              )
              .join("")}
        </div>
        <div class="statsBlock">
            <div class = "stat">
                <span class = "statName">HP</span>
                <span class = "statBar">
                    <div class="statSlider" style="width: ${
                      (pokemon.stats[0].base_stat / 255) * 100
                    }%; background-color: #ff0000;"></div>
                </span>
            </div>
            <div class = "stat">
                <span class = "statName">Def</span>
                <span class = "statBar">
                    <div class="statSlider" style="width: ${
                      (pokemon.stats[1].base_stat / 255) * 100
                    }%; background-color: #F08030;"></div>
                </span>
            </div>
            <div class = "stat">
                <span class = "statName">Atk</span>
                <span class = "statBar">
                    <div class="statSlider" style="width: ${
                      (pokemon.stats[2].base_stat / 255) * 100
                    }%; background-color: #F8D030;"></div>
                </span>
            </div>
            <div class = "stat">
                <span class = "statName">HP</span>
                <span class = "statBar">
                    <div class="statSlider" style="width: ${
                      (pokemon.stats[3].base_stat / 255) * 100
                    }%; background-color: #F85888;"></div>
                </span>
            </div>
            <div class = "stat">
                <span class = "statName">HP</span>
                <span class = "statBar">
                    <div class="statSlider" style="width: ${
                      (pokemon.stats[4].base_stat / 255) * 100
                    }%; background-color: #78C850;"></div>
                </span>
            </div>
            <div class = "stat">
                <span class = "statName">HP</span>
                <span class = "statBar">
                    <div class="statSlider" style="width: ${
                      (pokemon.stats[5].base_stat / 255) * 100
                    }%; background-color: #F85888;"></div>
                </span>
            </div>
        </div>
    </div>
</div>
    `;
}
function UpdatePokemonEventListeners() {
  const addedPokemon = document.querySelectorAll(".pokemon");
  for (let i = 0; i < addedPokemon.length; i++) {
    addedPokemon[i].addEventListener("click", () =>
      OpenDetailedView(addedPokemon[i])
    );
  }
}
function OpenDetailedView(pokemon) {
  detailedView.OpenOnId(
    Number(pokemon.querySelector(".number").innerText.replace("#", ""))
  );
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newPokemonListHtml = pokemons.map(convertPokemonToLi).join("");
    const newPokemonDetailedHtml = pokemons
      .map(convertPokemonToDetailedLi)
      .join("");
    pokemonList.innerHTML += newPokemonListHtml;
    detailedView.pokemonList.innerHTML += newPokemonDetailedHtml;
    UpdatePokemonEventListeners();
  });
}

function loadFurtherPokemon() {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
}

loadMoreButton.addEventListener("click", loadFurtherPokemon);

loadPokemonItems(offset, limit);
