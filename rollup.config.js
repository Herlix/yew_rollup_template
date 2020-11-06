import {
    terser
} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import rust from "@wasm-tool/rollup-plugin-rust";
import serve from 'rollup-plugin-serve';

export default {
    watch: {
        include: ['src/**']
    },
    input: 'main.js',
    // Since a yew app is a Rust app, there's not much work in JS
    // To make is less complex we bundle it by default
    output: {
        file: '__dist__/bundle.min.js',
        format: 'iife',
        name: 'main',
        plugins: [terser()]
    },
    plugins: [
        rust(),
        copy({
            targets: [{
                src: 'static/*',
                dest: '__dist__'
            }]
        }),
        serve({
            open: false,
            contentBase: '__dist__',
            host: 'localhost',
            port: 8080,
        })
    ]
};