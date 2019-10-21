import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import buble from 'rollup-plugin-buble';
import { uglify } from "rollup-plugin-uglify";


export default {
	input: 'src/main.js',
	output: {
		file: './public/js/bundle.js',
		format: 'iife',
		name: 'app',
		sourcemap: true
	},
	plugins: [
		resolve({
			browser: true,
			preferBuiltins: false
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		commonjs(), // converts date-fns to ES modules

		svelte(),
		json(),
		buble(),
		uglify()
	]
};