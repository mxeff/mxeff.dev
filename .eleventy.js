const { createElement, isValidElement } = require('preact');
const { render } = require('preact-render-to-string');

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = (config) => {
    config.addExtension('11ty.js', {
        compile: async (permalink, path) => {
            return async (data) => {
                if (permalink) {
                    return typeof permalink === 'function'
                        ? permalink(data)
                        : permalink;
                }

                delete require.cache[require.resolve(path)];

                const module = require(path);

                const vnode = createElement(module.default);

                if (isValidElement(vnode)) {
                    return render(vnode);
                }
            };
        },
        data: true,
        read: false,
    });

    return {
        dir: {
            input: 'src/.11ty',
        },
    };
};
