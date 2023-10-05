const TEMPLATE = document.createElement('div');

TEMPLATE.innerHTML = `
	<style>
		div p {
			color: tomato;
		}
		.texto {
			color: green;
		}
	</style>
	<p class="texto">Hola mundo 2</p>
	<p>Texto de ejemplos para la clase</p>
`;

class MyElement extends HTMLElement {
	public p: HTMLParagraphElement;

	constructor() {
		super();

		this.p = document.createElement('p');
	}

	connectedCallback() {
		this.p.textContent = 'Hello World';
		this.append(this.p, TEMPLATE);
	}
}

customElements.define('my-element', MyElement);
