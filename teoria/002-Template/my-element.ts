interface WebComponent {
	getTemplate: () => HTMLTemplateElement;
	getStyles: () => HTMLStyleElement;
	render: () => void;
	connectedCallback: () => void;
}

class MyElement extends HTMLElement implements WebComponent {
	constructor() {
		super();
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
			h2 {
				color: red;
			}

			div {
				&:before {
					content: 'Hola mundo';
					color: blue;
				}
			}
		`;

		return STYLES;
	}

	render(): void {
		this.append(
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
