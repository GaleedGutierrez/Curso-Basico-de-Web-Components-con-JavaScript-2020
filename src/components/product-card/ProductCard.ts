import BASE_CSS from '../../assets/styles/index.scss?inline';
import CSS from './index.scss?inline';

type Attributes = 'title' | 'collection' | 'description' | 'price' | 'img';

interface WebComponent {
	connectedCallback: () => void;
	attributeChangedCallback: (
		attribute: Attributes,
		oldValue: string,
		newValue: string
	) => void;
	disconnectedCallback?: () => void;
	readonly observedAttributes?: Attributes[];
}

class ProductCard extends HTMLElement implements WebComponent {
	// public title: string | null = null;
	public collection: string | null = null;
	public description: string | null = null;
	public price: string | null = null;
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
		const { title, collection, description, price, img } = this;
		const BRAND = title.split(' ')[0];
		const PRICE = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(Number(price));

		SECTION.innerHTML = /* html */ `
			<div class="product-card__img-container">
				<span class="product-card__brand">${BRAND}</span>
				<img class="product-card__img" src="${img}" alt="${title}" />
			</div>
			<div class="product-card__info-container">
				<h1>${title}</h1>
				<h2 class="product-card__collection-title">${title}</h2>${collection}</h2>
				<p>${description}</p>
				<div class="product-card__buy-container">
					<p class="product-card__price">${PRICE}</p>
					<button class="product-card__button">Buy now</button>
				</div>
			</div>
		`;
		SECTION.className = 'product-card';
		TEMPLATE.content.append(SECTION.cloneNode(true));

		return TEMPLATE.content.cloneNode(true);
	};

	#getStyles = (): HTMLStyleElement => {
		const STYLES = document.createElement('style');

		STYLES.innerHTML = `
			${BASE_CSS}
			${CSS}
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
		return ['title', 'collection', 'description', 'price', 'img'];
	}
}

customElements.define('product-card', ProductCard);
