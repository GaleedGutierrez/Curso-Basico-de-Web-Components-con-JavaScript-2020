type Attributes = 'title' | 'paragraph' | 'img';

// Esta interfaz es una guía para armar un Web Component,
// no es necesario implementarla.
interface WebComponent {
	connectedCallback?: () => void;
	attributeChangedCallback?: (
		attribute: Attributes,
		oldValue: string,
		newValue: string
	) => void;
	// No podemos poner una clase estática en una interfaz,
	// esta línea es la forma que tenemos para establecer un getter.
	readonly observedAttributes?: Attributes[];
	disconnectedCallback?: () => void;
}

class MyCustomElement extends HTMLElement implements WebComponent {
	public constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		console.log('Hola desde el constructor - Memoria');
	}

	public connectedCallback(): void {
		console.log('Hola desde DOM');
	}

	public disconnectedCallback() {
		console.log('Adios del DOM');
	}
}

customElements.define('my-custom-element', MyCustomElement);
document.querySelector('my-custom-element')?.remove();

export {};
