// @ts-check
const env = {
	es2022: true,
	browser: true,
	amd: true,
	node: true
};
const EXTENDS = [
	"eslint:recommended",
	"plugin:@typescript-eslint/recommended",
	"plugin:import/recommended",
	"plugin:import/typescript",
	"plugin:editorconfig/noconflict",
	"plugin:prettier/recommended"
];
const plugins = [
	"@typescript-eslint",
	"import",
	"simple-import-sort",
	"unused-imports",
	"check-file",
	"editorconfig"
];
const overrides = [];
const parserOptions = {
	ecmaVersion: "latest",
	sourceType: "module"
};

const rules = {
	"prettier/prettier": "error",

	semi: ["error", "always"],
	"comma-spacing": [
		"error",
		{
			before: false,
			after: true
		}
	],
	"no-multi-spaces": [
		"error",
		{
			ignoreEOLComments: false
		}
	],
	"padding-line-between-statements": [
		"error",
		{ blankLine: "always", prev: "*", next: "return" },
		{ blankLine: "always", prev: "*", next: "block-like" },
		{ blankLine: "always", prev: ["case", "default"], next: "*" },
		{ blankLine: "always", prev: "directive", next: "*" },
		{ blankLine: "any", prev: "directive", next: "directive" },
		{
			blankLine: "always",
			prev: ["const", "let", "var"],
			next: "*"
		},
		{
			blankLine: "any",
			prev: ["const", "let", "var"],
			next: ["const", "let", "var"]
		},
		{ blankLine: "always", prev: "block-like", next: "*" },
		{ blankLine: "always", prev: "expression", next: "*" }, // veremos
		{ blankLine: "always", prev: "*", next: "expression" }, // veremos
		{ blankLine: "any", prev: "expression", next: "expression" }, // veremos
		{ blankLine: "always", prev: "import", next: "*" },
		{ blankLine: "any", prev: "import", next: "import" },
		{ blankLine: "always", prev: "export", next: "*" },
		{ blankLine: "always", prev: "*", next: "export" },
		{ blankLine: "always", prev: "if", next: "*" }
	],
	"arrow-spacing": ["error", { before: true, after: true }],
	"lines-between-class-members": [
		"error",
		"always",
		{ exceptAfterSingleLine: true }
	],
	"object-curly-spacing": ["error", "always"],
	"computed-property-spacing": [
		"error",
		"never",
		{ enforceForClassMembers: true }
	],
	"keyword-spacing": ["error", { before: true }],
	"space-before-blocks": "error",
	"no-unneeded-ternary": "error",
	"no-lone-blocks": "error",
	"space-in-parens": ["error", "never"],
	"func-call-spacing": ["error", "never"],
	"no-console": ["warn", { allow: ["warn", "error"] }], // Opcional
	"no-underscore-dangle": "error",

	//? TypeScript ESLint
	"@typescript-eslint/type-annotation-spacing": "error",
	"@typescript-eslint/no-non-null-assertion": "warn",
	"@typescript-eslint/consistent-type-definitions": "warn",
	"@typescript-eslint/naming-convention": [
		"error",
		{
			selector: "class",
			format: ["PascalCase"]
		}
	],
	"@typescript-eslint/member-ordering": [
		"error",
		{
			default: [
				// Index signature for interfaces
				"signature",
				"call-signature",

				// Fields o variables
				"public-instance-field",
				"protected-instance-field",
				"private-instance-field",
				"#private-instance-field",

				"public-static-field",
				"protected-static-field",
				"private-static-field",
				"#private-static-field",

				"public-decorated-field",
				"protected-decorated-field",
				"private-decorated-field",

				"public-abstract-field",
				"protected-abstract-field",

				"public-field",
				"protected-field",
				"private-field",
				"#private-field",

				"instance-field",
				"static-field",
				"decorated-field",
				"abstract-field",

				"field",

				// Static initialization
				"static-initialization",

				// Constructors
				"public-constructor",
				"protected-constructor",
				"private-constructor",

				"constructor",

				// Methods
				"public-instance-method",
				"protected-instance-method",
				"private-instance-method",
				"#private-instance-method",

				"public-static-method",
				"protected-static-method",
				"private-static-method",
				"#private-static-method",

				"public-decorated-method",
				"protected-decorated-method",
				"private-decorated-method",

				"public-abstract-method",
				"protected-abstract-method",

				"public-method",
				"protected-method",
				"private-method",
				"#private-method",

				"instance-method",
				"static-method",
				"decorated-method",
				"abstract-method",

				"method",

				// Getters
				"public-instance-get",
				"protected-instance-get",
				"private-instance-get",
				"#private-instance-get",

				"public-static-get",
				"protected-static-get",
				"private-static-get",
				"#private-static-get",

				"public-decorated-get",
				"protected-decorated-get",
				"private-decorated-get",

				"public-abstract-get",
				"protected-abstract-get",

				"public-get",
				"protected-get",
				"private-get",
				"#private-get",

				"instance-get",
				"static-get",
				"decorated-get",
				"abstract-get",

				"get",

				// Setters
				"public-instance-set",
				"protected-instance-set",
				"private-instance-set",
				"#private-instance-set",

				"public-static-set",
				"protected-static-set",
				"private-static-set",
				"#private-static-set",

				"public-decorated-set",
				"protected-decorated-set",
				"private-decorated-set",

				"public-abstract-set",
				"protected-abstract-set",

				"public-set",
				"protected-set",
				"private-set",
				"#private-set",

				"instance-set",
				"static-set",
				"decorated-set",
				"abstract-set",

				"set"
			]
		}
	],

	//? Codely: plugins
	"import/first": "error",
	"import/newline-after-import": "error",
	"import/no-duplicates": "error",
	"import/no-unresolved": ["error", { ignore: ["\\.mjs"] }],
	"import/no-webpack-loader-syntax": "error",
	"simple-import-sort/imports": "error",
	"simple-import-sort/exports": "error",

	"check-file/folder-naming-convention": [
		"error",
		{
			"./src/**/": "KEBAB_CASE"
		}
	],

	"unused-imports/no-unused-imports": "error",
	"unused-imports/no-unused-vars": [
		"warn",
		{
			vars: "all",
			varsIgnorePattern: "^_",
			args: "after-used",
			argsIgnorePattern: "^_"
		}
	],

	"array-callback-return": ["error", { checkForEach: true }],
	"no-await-in-loop": "error",
	"no-constant-binary-expression": "error",
	"no-constructor-return": "error",
	"no-promise-executor-return": "error",
	"no-self-compare": "error",
	"no-template-curly-in-string": "error",
	"no-unmodified-loop-condition": "error",
	"no-unreachable-loop": "error",
	"no-unused-private-class-members": "error",
	"no-use-before-define": ["error"],
	"require-atomic-updates": "error",
	camelcase: "error",
	eqeqeq: "error",
	"new-cap": "error",
	"no-array-constructor": "error",
	"no-else-return": ["error", { allowElseIf: false }],
	"no-extend-native": "error",
	"no-lonely-if": "error",
	"no-param-reassign": "error",
	"no-return-assign": "error",
	"no-throw-literal": "error",
	"no-var": "error",
	"object-shorthand": "error",
	"prefer-const": "error",
	"prefer-rest-params": "error",
	"prefer-spread": "error",
	"prefer-template": "error",
	radix: "error",
	yoda: "error"
};
const settings = {
	"import/resolver": {
		typescript: {}
	}
};

module.exports = {
	root: true,
	env,
	extends: EXTENDS,
	plugins,
	overrides,
	parserOptions,
	parser: "@typescript-eslint/parser",
	rules,
	settings
};
