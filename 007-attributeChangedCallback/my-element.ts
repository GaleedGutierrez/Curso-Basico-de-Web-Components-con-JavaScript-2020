type Attributes = 'title' | 'paragraph' | 'img';

// Esta interfaz es una guía para armar un Web Component,
// no es necesario implementarla.
interface WebComponent {
	connectedCallback: () => void;
	attributeChangedCallback: (
		attribute: Attributes,
		oldValue: string,
		newValue: string
	) => void;
	// No podemos poner una clase estática en una interfaz,
	// esta línea es la forma que tenemos para establecer un getter.
	readonly observedAttributes?: Attributes[];
}

class MyElement extends HTMLElement implements WebComponent {
	public paragraph: string | null = null;
	public img: string | null = null;

	public constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	public connectedCallback(): void {
		this.#render();
	}

	public attributeChangedCallback(
		attribute: Attributes,
		oldValue: string,
		newValue: string
	): void {
		if (oldValue === newValue) return;

		this[attribute] = newValue;
		this.#update();
	}

	#getTemplate = (): Node => {
		const TEMPLATE = document.createElement('template');
		const SECTION = document.createElement('section');
		const { title, paragraph, img } = this;

		SECTION.innerHTML = `
			<h2>${title}</h2>
			<div>
				<p>${paragraph}</p>
				<img src="${img}" alt="imagen de prueba" width="300px" height="300px" />
			</div>
		`;
		TEMPLATE.content.append(SECTION.cloneNode(true));

		return TEMPLATE.content.cloneNode(true);
	};

	#getStyles = (): HTMLStyleElement => {
		const STYLES = document.createElement('style');

		STYLES.innerHTML = `
			h2 {
				color: red;
			}

			div {
				&:after {
					content: 'Hola mundo AFTER CSS';
					color: blue;
				}
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

	#clean = (): void => {
		const HAS_ELEMENTS = this.shadowRoot?.hasChildNodes();

		if (!HAS_ELEMENTS) return;

		this.shadowRoot?.replaceChildren();
	};

	#update = (): void => {
		this.#clean();
		this.#render();
	};

	public static get observedAttributes(): Attributes[] {
		return ['title', 'paragraph', 'img'];
	}
}

customElements.define('my-element', MyElement);

export {};
