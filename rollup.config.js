import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const files = [
	{
		name: 'Footer',
		input: 'src/Footer.svelte',
		output: 'public/build/footer.js',
		css: 'public/build/footer.css',
	},
	{
		name: 'SiteNav',
		input: 'src/SiteNav.svelte',
		output: 'public/build/sitenav.js',
		css: 'public/build/sitenav.css'
	},
]

export default files.map(f => ({
	input: f.input,
	output: {
		sourcemap: true,
		format: 'iife',
		name: f.name,
		file: f.output
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			accessors: true,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write(f.css);
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}));

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
