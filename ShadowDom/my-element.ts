interface WebComponent {
	getTemplate: () => HTMLTemplateElement;
	getStyles: () => HTMLStyleElement;
	render: () => void;
	connectedCallback: () => void;
}

class MyElement extends HTMLElement implements WebComponent {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate(): HTMLTemplateElement {
		const TEMPLATE = document.createElement('template');
		const SECTION = document.createElement('section');

		SECTION.innerHTML = `
			<h2 class="title">Hola mundo again</h2>
			<div>
				<p>Soy más texto de ejemplo de la clase</p>
			</div>
		`;
		TEMPLATE.content.append(SECTION.cloneNode(true));

		return TEMPLATE;
	}

	getStyles(): HTMLStyleElement {
		const STYLES = document.createElement('style');

		STYLES.innerHTML = `
			.title {
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
	}

	render(): void {
		this.shadowRoot?.append(
			this.getTemplate().content.cloneNode(true),
			this.getStyles()
		);
	}

	connectedCallback(): void {
		this.render();
	}
}

customElements.define('my-element', MyElement);

export {};
