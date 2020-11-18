import {
    terser
} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import rust from "@wasm-tool/rollup-plugin-rust";
import serve from 'rollup-plugin-serve';
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'

const DIR = './__dist__';

export default {
    watch: {
        include: ['src/**']
    },
    input: 'main.js',
    // Since a yew app is a Rust app, there's not much work in JS
    // To make is less complex we bundle it by default
    output: {
        file: DIR + '/bundle.min.js',
        format: 'iife',
        name: 'main',
        plugins: [terser()]
    },
    plugins: [
        postcss({
            sourceMap: true,
            extract: true,
            minimize: true
        }),
        rust(),
        copy({
            targets: [{
                src: 'static/*',
                dest: DIR
            }]
        }),
        serve({
            open: false,
            contentBase: DIR,
            host: 'localhost',
            port: 8081,
        }),
        del({
            targets: DIR + '/assets/*.wasm'
        })
    ]
};