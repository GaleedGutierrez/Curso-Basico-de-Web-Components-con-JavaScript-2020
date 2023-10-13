interface WebComponent {
	getTemplate: () => Node;
	getStyles: () => HTMLStyleElement;
	render: () => void;
	connectedCallback: () => void;
}

class MyElement extends HTMLElement implements WebComponent {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	getTemplate(): Node {
		const TEMPLATE = document.createElement('template');
		const SECTION = document.createElement('section');

		SECTION.innerHTML = `
			<h2>
				<slot></slot>
			</h2>
		`;
		TEMPLATE.content.append(SECTION.cloneNode(true));

		return TEMPLATE.content.cloneNode(true);
	}

	getStyles(): HTMLStyleElement {
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
	}

	render(): void {
		const { shadowRoot, getTemplate, getStyles } = this;

		shadowRoot?.append(getTemplate(), getStyles());
	}

	connectedCallback(): void {
		this.render();
	}
}

customElements.define('my-element', MyElement);

export {};
