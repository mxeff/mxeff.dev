import path from 'path';
import type { ComponentChildren } from 'preact';

interface Props {
    children: ComponentChildren;
    entryPath?: string;
    title: string;
}

const Default = ({ children, entryPath, title }: Props) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link href="/favicon.png" rel="shortcut icon" />
                <link
                    href={path.resolve(
                        process.env.PWD ?? '',
                        'node_modules/the-new-css-reset/css/reset.css'
                    )}
                    rel="stylesheet"
                />
                <link
                    href={path.resolve(
                        process.env.PWD ?? '',
                        'src/scss/index.scss'
                    )}
                    rel="stylesheet"
                />
                <link
                    href={__filename.replace('.js', '.css')}
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
            {entryPath && (
                <script
                    type="module"
                    src={path.join(
                        __dirname.replace(__TEMP_DIR__, __ROOT__),
                        entryPath
                    )}
                />
            )}
        </html>
    );
};

export default Default;
