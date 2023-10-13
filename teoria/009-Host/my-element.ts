type Attributes = 'title' | 'paragraph' | 'img';

// Esta interfaz es una guía para armar un Web Component,
// no es necesario implementarla.
interface WebComponent {
	connectedCallback: () => void;
	attributeChangedCallback?: (
		attribute: Attributes,
		oldValue: string,
		newValue: string
	) => void;
	disconnectedCallback?: () => void;
	// No podemos poner una clase estática en una interfaz,
	// esta línea es la forma que tenemos para establecer un getter.
	readonly observedAttributes?: Attributes[];
}

class MyElement extends HTMLElement implements WebComponent {
	public constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	public connectedCallback(): void {
		this.#render();
	}

	#getTemplate = (): Node => {
		const TEMPLATE = document.createElement('template');
		const SECTION = document.createElement('section');

		SECTION.innerHTML = /*template*/ `
			<h1>
				<slot name="title"></slot>
			</h1>
			<div class="div">
			<p>
				<slot name="paragraph"></slot>
			</p></div>
		`;
		TEMPLATE.content.append(SECTION.cloneNode(true));

		return TEMPLATE.content.cloneNode(true);
	};

	#getStyles = (): HTMLStyleElement => {
		const STYLES = document.createElement('style');

		STYLES.innerHTML = /*css*/ `
				:host {
					display: inline-block;
					inline-size: 100%;
					max-inline-size: 450px;
					min-inline-size: 300px;
					font-size: 2rem;
					background-color: blue;
					color: white;
					padding: 1rem;
					margin: 1rem;
				}

				:host(.grey) {
					background-color: grey;
				}

				:host([yellow]) {
					background-color: yellow;
					color: black;
				}

				:host([yellow]) {
					background-color: yellow;
					color: black;
				}

				:host([yellow]) h1,
				:host([yellow]) p {
					color: red;
				}

				:host([yellow]) p {
					color: green;
					font-weight: bold;
				}

				:host-context(article) {
					display: block;
					max-inline-size: 100%;
				}
			`;

		return STYLES;
	};

	#render = (): void => {
		const { shadowRoot } = this;

		if (!shadowRoot) return;

		const getTemplate = this.#getTemplate;
		const getStyles = this.#getStyles;

		shadowRoot.append(getTemplate(), getStyles());
	};
}

customElements.define('my-element', MyElement);

export {};
