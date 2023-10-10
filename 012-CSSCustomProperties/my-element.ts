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
				</p>
			</div>
		`;
		TEMPLATE.content.append(SECTION.cloneNode(true));

		return TEMPLATE.content.cloneNode(true);
	};

	#getStyles = (): HTMLStyleElement => {
		const STYLES = document.createElement('style');

		STYLES.innerHTML = /*css*/ `
			:host {
				--primary-color: tomato;
				--secondary-color: salmon;
				--heading-primary: 3rem;
				--heading-secondary: 2rem;
			}

			section {
				background-color: var(--primary-color);
				padding: 1rem;

				& h1 {
					font-size: var(--heading-primary);
				}

				& div {
					background-color: var(--secondary-color);

					& p {
						font-size: var(--heading-secondary);
					}
				}
			}
		`;

		return STYLES;
	};

	#render = (): void => {
		const getTemplate = this.#getTemplate;
		const getStyles = this.#getStyles;

		this.shadowRoot?.append(getTemplate(), getStyles());
	};
}

customElements.define('my-element', MyElement);

export {};
