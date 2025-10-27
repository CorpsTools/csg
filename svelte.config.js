import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			// 👇 Only set this for production builds (GitHub Pages)
			base: dev ? '' : '/csg'
		},
	}
};

export default config;
