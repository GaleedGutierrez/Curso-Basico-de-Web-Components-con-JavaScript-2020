import { fileURLToPath, URL } from 'node:url';

import { defineConfig, UserConfigExport } from 'vite';

const config: UserConfigExport = {
	base: './',
	resolve: {
		alias: {
			'@fonts': fileURLToPath(new URL('./assets/fonts', import.meta.url)),
			'@icons': fileURLToPath(new URL('./assets/icons', import.meta.url)),
			'@styles': fileURLToPath(new URL('./scss', import.meta.url)),
			'@components': fileURLToPath(
				new URL('./src/components', import.meta.url)
			)
		}
	},
	server: {
		open: './',
		port: 8080,
		host: true
	},
	build: {
		// sourcemap: true,
		// manifest: true,
		// rollupOptions: {
		// 	input: {
		// 		index: resolve(__dirname, './CustomElements/index.html')
		// 	}
		// }
	}
};

export default defineConfig(config);
