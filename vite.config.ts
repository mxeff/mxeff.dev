import path from 'path';
import linaria from '@linaria/vite';
import preact from '@preact/preset-vite';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import eleventy from './vite/vite-plugin-eleventy';

const root = './src';
const outDir = '../_site';

export default defineConfig(({ command }) => ({
    build: {
        outDir,
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[hash][extname]',
                entryFileNames: 'assets/[hash].js',
                chunkFileNames: 'assets/[hash].js',
            },
        },
        target: command === 'build' ? 'es2015' : 'modules',
    },
    define: {
        __ROOT__: JSON.stringify(root),
        __OUT_DIR_: JSON.stringify(outDir),
    },
    plugins: [
        tsconfigPaths({ root }),
        eleventy(),
        linaria(),
        preact({ prefreshEnabled: false }),
        splitVendorChunkPlugin(),
    ],
    publicDir: '../public',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, root),
        },
    },
    root,
}));
