import linaria from '@linaria/esbuild';
import * as esbuild from 'esbuild';
import type { BuildOptions } from 'esbuild';
import * as glob from 'glob';

const isProduction = process.env.NODE_ENV === 'production';

const buildOptions = {
    bundle: true,
    entryPoints: glob.sync('src/**/*.11ty.tsx'),
    metafile: true,
    platform: 'node',
    plugins: [
        linaria({
            esbuildOptions: {
                jsx: 'automatic',
                jsxImportSource: 'preact',
            },
            sourceMap: isProduction,
        }),
    ],
    outbase: 'src',
    outdir: 'src/.11ty',
} satisfies BuildOptions;

export const build = async (
    options: BuildOptions,
    callback?: () => Promise<void>
) =>
    esbuild.build({
        ...options,
        ...buildOptions,
        plugins: [
            ...buildOptions.plugins,
            {
                name: 'onEnd',
                setup: (build) => (callback ? build.onEnd(callback) : void 0),
            },
        ],
    });

export const watch = async (
    options: BuildOptions,
    callback?: () => Promise<void>
) => {
    const context = await esbuild.context({
        ...options,
        ...buildOptions,
        plugins: [
            ...buildOptions.plugins,
            {
                name: 'onEnd',
                setup: (build) => (callback ? build.onEnd(callback) : void 0),
            },
        ],
    });

    return context.watch();
};
