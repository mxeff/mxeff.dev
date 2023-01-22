import * as path from 'path';
import type { Result } from '@11ty/eleventy';
import { default as Eleventy } from '@11ty/eleventy';
import type { PluginOption, UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import { build, watch } from './bundle';
import type { ResolvedEntry } from './utils';
import { reduceResultsToResolvedEntriesByEntryName } from './utils';

const eleventy = (): PluginOption => {
    let eleventy: InstanceType<typeof Eleventy>;

    let define: Record<string, string>;

    let root: string;
    let outDir: string;
    let tempDir: string;

    let entriesByEntryName: Record<string, ResolvedEntry>;

    const buildEntriesByEntryName = async (results: Promise<Result[]>) =>
        reduceResultsToResolvedEntriesByEntryName(
            results,
            outDir,
            root,
            tempDir
        );

    return {
        name: '11ty/vite',
        config: async (config) => {
            root = config.root ?? '';
            outDir = config.build?.outDir ?? '';
            tempDir = path.join(root, '.11ty');

            define = {
                ...config.define,
                __TEMP_DIR__: JSON.stringify(tempDir),
            };

            await build({ define });

            eleventy = new Eleventy();

            entriesByEntryName = await buildEntriesByEntryName(
                eleventy.toJSON()
            );

            const input = Object.fromEntries(
                Object.entries(entriesByEntryName).map(([name, { id }]) => [
                    name,
                    id,
                ])
            );

            return mergeConfig(config, {
                appType: 'mpa',
                build: {
                    emptyOutDir: true,
                    rollupOptions: {
                        input,
                    },
                },
            } satisfies UserConfig);
        },
        configureServer: async (server) => {
            await watch({ define }, async () => {
                entriesByEntryName = await buildEntriesByEntryName(
                    eleventy.toJSON()
                );

                await new Promise((resolve) => setTimeout(resolve, 500));

                server.ws.send({
                    type: 'full-reload',
                });
            });

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            server.middlewares.use(async (req, res, next) => {
                const result = Object.values(entriesByEntryName).find(
                    ({ url }) => url === req.url
                );

                if (result?.content) {
                    const chunk = await server.transformIndexHtml(
                        req.url ?? '',
                        result.content
                    );

                    res.setHeader(
                        'Content-Type',
                        'text/html; charset=utf-8'
                    ).end(chunk);

                    return;
                }

                next();
            });
        },
        load: (id) => {
            const entry = Object.values(entriesByEntryName).find(
                (entry) => entry.id === id
            );

            if (entry?.content) {
                return entry.content;
            }
        },
        resolveId: (source, importer) => {
            const entry = Object.values(entriesByEntryName).find(
                ({ id }) => id === importer
            );

            if (entry) {
                const dir = path.dirname(entry.originalId);

                return path.join(root, dir, source);
            }

            return source;
        },
    };
};

export default eleventy;
