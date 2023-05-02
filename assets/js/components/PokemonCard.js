// Optei por não utilizar shadow DOM nesse componente pois quero utilizar o CSS definido globalmente.

class PokemonCardComponent extends HTMLElement {

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
        <li class="pokemon ${this.type}" onclick="OpenDetailedView(${this.id})">
            <span class="number">#${this.id}</span>
            <span class="name">${this.name}</span>

            <div class="detail">
                <ol class="types">
                    ${this.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${this.spriteUrl}"
                     alt="${this.name}">
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