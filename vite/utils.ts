import path from 'path';
import type { Result } from '@11ty/eleventy';

export const buildEntryNameFromOutputPath = (
    outputPath: string,
    outDir: string
): string =>
    outputPath.match(new RegExp(path.sep, 'g'))?.length === 1
        ? path.basename(outputPath, '.html')
        : path.dirname(
              outputPath.replace(
                  new RegExp(`${path.basename(outDir)}${path.sep}`),
                  ''
              )
          );

export interface ResolvedEntry {
    content: string;
    id: string;
    originalId: string;
    url: string;
}

export const reduceResultsToResolvedEntriesByEntryName = async (
    results: Promise<Result[]>,
    outDir: string,
    root: string,
    tempDir: string
) =>
    (await results).reduce<Record<string, ResolvedEntry>>(
        (previousValue, { inputPath, outputPath, ...currentValue }) => {
            const name = buildEntryNameFromOutputPath(outputPath, outDir);

            previousValue[name] = {
                ...currentValue,
                id: path.join(
                    root,
                    outputPath.replace(path.basename(outDir), '')
                ),
                originalId: path.relative(tempDir, inputPath),
            };

            return previousValue;
        },
        {}
    );
