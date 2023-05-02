// Optei por não utilizar shadow DOM nesse componente pois quero utilizar o CSS definido globalmente.

class PokemonDetailCardComponent extends HTMLElement {

    // Declaro variáveis onde serão guardadas as props do componente.
    id;
    name;
    type;
    type2;
    spriteUrl;

    types = [];

    constructor() {
        super();
        
        // Pego as propriedades do HTML.
        this.getProps();
        
        // Crio elementos HTML do componente e os adiciono ao componente.
        this.append(this.buildHtml());

        // Nesse caso, preciso das classes no elemento raíz.
        this.setAttribute('class', `listedDetails ${this.type}`)
        
        // Monto um Mutation Observer que acionará o método updateComponent quando uma prop for alterada.
        this.mutationObserver = new MutationObserver(() => this.updateComponent());
        this.mutationObserver.observe(this, {attributes: true});
    }

    getProps() {
        this.id = this.getAttribute('id');
        this.name = this.getAttribute('name');
        this.type = this.getAttribute('type');
        this.type2 = this.getAttribute('type2');
        this.spriteUrl = this.getAttribute('spriteUrl');

        this.types = [];

        this.types.push(this.type);

        if(this.type2 === undefined) return;

        this.types.push(this.type2);
    }

    buildHtml() {
        const htmlComponent = document.createElement('template');

        htmlComponent.innerHTML =
        `
        <span class="name">${this.name}</span>
        <img src="${this.spriteUrl}" alt="">
        <div class = "detailBlock">
            <div class="typesBlock">
                ${this.types
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
                        // (pokemon.stats[0].base_stat / 255) * 100
                        50
                        }%; background-color: #ff0000;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">Def</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        // (pokemon.stats[1].base_stat / 255) * 100
                        100
                        }%; background-color: #F08030;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">Atk</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        // (pokemon.stats[2].base_stat / 255) * 100
                        150
                        }%; background-color: #F8D030;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">HP</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        // (pokemon.stats[3].base_stat / 255) * 100
                        200
                        }%; background-color: #F85888;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">HP</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        // (pokemon.stats[4].base_stat / 255) * 100
                        250
                        }%; background-color: #78C850;"></div>
                    </span>
                </div>
                <div class = "stat">
                    <span class = "statName">HP</span>
                    <span class = "statBar">
                        <div class="statSlider" style="width: ${
                        // (pokemon.stats[5].base_stat / 255) * 100
                        300
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