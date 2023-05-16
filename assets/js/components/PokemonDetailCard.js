class PokemonDetailCardComponent extends HTMLElement {

    pokemonJson;

    constructor() {
        super();
        
        // Pego as propriedades do HTML.
        this.getProps();
        
        // Crio elementos HTML do componente e os adiciono ao componente.
        this.append(this.buildHtml());

        // Nesse caso, preciso das classes no elemento raíz.
        this.setAttribute('class', `listedDetails ${this.pokemonJson.types[0]}`)
        
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
        <span class="bgName">${this.pokemonJson.name.jp}</span>
        <img src="${this.pokemonJson.spriteUrl}" alt="">
        <span class="name">${this.pokemonJson.name.en}</span>
        <div class = "detailBlock">
            <div class="typesBlock">
                ${this.pokemonJson.types
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
                        (this.pokemonJson.stats.hp / 255) * 100
                        }%; background-color: #ff0000;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">Def</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        (this.pokemonJson.stats.atk / 255) * 100
                        }%; background-color: #F08030;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">Atk</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        (this.pokemonJson.stats.def / 255) * 100
                        }%; background-color: #F8D030;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">HP</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        (this.pokemonJson.stats.spAtk / 255) * 100
                        }%; background-color: #F85888;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">HP</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        (this.pokemonJson.stats.spDef / 255) * 100
                        }%; background-color: #78C850;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">HP</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        (this.pokemonJson.stats.spd / 255) * 100
                        }%; background-color: #F85888;"></div>
                    </span>
                </div>
            </div>
        </div>
        `

        return htmlComponent.content;
    }

    updateComponent() {
        this.getProps();
        this.replaceChildren(this.buildHtml());
    }
}

// Crio definição do componente como tag pra ser usado no HTML.
customElements.define('pokemon-detail-card', PokemonDetailCardComponent);