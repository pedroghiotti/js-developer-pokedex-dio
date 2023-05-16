class PokemonCardComponent extends HTMLElement {

    pokemonJson;

    constructor() {
        super();
        
        // Pego as propriedades do HTML.
        this.getProps();
        
        // Crio elementos HTML do componente e os adiciono ao componente.
        this.append(this.buildHtml());
        
        // Monto um Mutation Observer que acionará o método updateComponent quando uma prop for alterada.
        this.mutationObserver = new MutationObserver(() => this.updateComponent());
        this.mutationObserver.observe(this, {attributes: true});
    }

    getProps() {
        this.pokemonJson = JSON.parse(this.getAttribute('pokemonJson'));
    }

    buildHtml() {
        const htmlComponent = document.createElement('template');

        htmlComponent.innerHTML =
        `
        <li class="pokemon ${this.pokemonJson.types[0]}" onclick="OpenDetailedView(${this.pokemonJson.id})">
            <span class="number">#${this.pokemonJson.id}</span>
            <span class="name">${this.pokemonJson.name.en}</span>

            <div class="detail">
                <ol class="types">
                    ${this.pokemonJson.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${this.pokemonJson.spriteUrl}"
                     alt="${this.pokemonJson.name.en}">
            </div>
        </li>
        `

        return htmlComponent.content;
    }

    updateComponent() {
        this.getProps();
        this.replaceChildren(this.buildHtml());
    }
}

// Crio definição do componente como tag pra ser usado no HTML.
customElements.define('pokemon-card', PokemonCardComponent);