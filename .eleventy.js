const { isValidElement } = require('preact');
const { render } = require('preact-render-to-string');
const decache = require('decache');

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

                decache(path);

                const module = require(path);

                const vnode = module.default;

                if (isValidElement(vnode())) {
                    return render(vnode());
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
