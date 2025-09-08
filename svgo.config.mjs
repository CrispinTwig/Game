export default {
    //js2svg: { indent: 2, pretty: true },
    /*
    multipass: false, // boolean
    datauri: 'unenc', // 'base64'|'enc'|'unenc'
    js2svg: {
        indent: 4, // number
        pretty: false, // boolean
    },
    */
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    // disable a default plugin
                    cleanupIds: {
                        preservePrefixes: [ 'group_', 'symbol_' ]
                    },

                    collapseGroups: false,

                    // customize the params of a default plugin
                    inlineStyles: {
                        onlyMatchedOnce: false,
                    },
                },
            },
        },

        /*
        'preset-default', // built-in plugins enabled by default
        'prefixIds', // enable built-in plugins by name

        // enable built-in plugins with an object to configure plugins
        {
            name: 'prefixIds',
            params: {
                prefix: 'uwu',
            },
        },
        */
    ],
};
