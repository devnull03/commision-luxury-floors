import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			images: {
				sizes: [640, 828, 1200, 1920, 3840],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: ['www.luxuryfloors.ca', 'luxuryfloors.ca', 'commision-luxury-floors.vercel.app'],
				localPatterns: [
					{
						pathname: '/static/assets/**',
						search: '',
					}
				]
			}
		})
	}
};

export default config;
