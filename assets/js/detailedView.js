const detailedView = {
  element: document.querySelector("#detailView"),
  pokemonList: document.querySelector("#detailViewPokemonList"),
  idList: document.querySelector("#detailViewIdList"),
};

let currPokemonId = 1;

// Function Declaractions //
detailedView.ScrollToId = (id) => {
  currPokemonId = id;

  if (currPokemonId >= offset + limit - 1) requestLoadPokemon();

  const pageElementWidth =
    detailedView.pokemonList.getBoundingClientRect().width; // Largura do elemento de detalhes.
  const idElementWidth = document
    .querySelector(".listedId")
    .getBoundingClientRect().width; // Largura do elemento de ID.

  // Movendo scroll para posição.
  detailedView.pokemonList.scrollTo(pageElementWidth * (id - 1), 0);
  /*
        Aqui eu adiciono um offset ao id pois tenho elementos adicionais para permitir
        o efeito da lista com o elemento atual centralizado.
    */
  detailedView.idList.scrollTo(idElementWidth * (id + 4), 0);
};
detailedView.ScrollToNext = () => {
  if (currPokemonId >= maxRecords) return;
  detailedView.ScrollToId(currPokemonId + 1);
};
detailedView.ScrollToPrev = () => {
  if (currPokemonId <= 1) return;
  detailedView.ScrollToId(currPokemonId - 1);
};
detailedView.OpenOnId = (id) => {
  detailedView.ScrollToId(id);
  detailedView.element.classList.remove("hidden");
};

// Event Bindings //
document.getElementById("detailViewIdPrev").addEventListener("click", () => {
  detailedView.ScrollToPrev();
});
document.getElementById("detailViewIdNext").addEventListener("click", () => {
  detailedView.ScrollToNext();
});
document
  .getElementById("detailViewReturnButton")
  .addEventListener("click", () => {
    detailedView.element.classList.add("hidden");
  });

// Atualizo a posição do scroll se a janela for redimensionada.
window.addEventListener(
  "resize",
  function (event) {
    detailedView.ScrollToId(currPokemonId);
  },
  true
);

// Initialization //
(() => {
  let idListStr = "";

  for (let i = 1; i <= maxRecords; i++) {
    idListStr += `<span class="listedId">${i}</span>`;
  }

  detailedView.idList.innerHTML = detailedView.idList.innerHTML.replace(
    "!",
    idListStr
  );
})();
