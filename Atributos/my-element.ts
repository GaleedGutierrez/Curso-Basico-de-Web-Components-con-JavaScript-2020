interface WebComponent {
	getTemplate: () => Node;
	getStyles: () => HTMLStyleElement;
	render: () => void;
	connectedCallback: () => void;
}

class MyElement extends HTMLElement implements WebComponent {
	paragraph: string | null;
	img: string | null;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.title = this.getAttribute('title') ?? 'Sin título';
		this.paragraph = this.getAttribute('paragraph') ?? 'Sin párrafo';
		this.img = this.getAttribute('img') ?? '';
	}

	getTemplate = (): Node => {
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

	getStyles = (): HTMLStyleElement => {
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

	render = (): void => {
		const { shadowRoot, getTemplate, getStyles } = this;

		shadowRoot?.append(getTemplate(), getStyles());
	};

	connectedCallback(): void {
		this.render();
	}
}

customElements.define('my-element', MyElement);

export {};
