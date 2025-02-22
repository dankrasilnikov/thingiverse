const postcssConfig = require('./postcss.config')
const cracoAlias = require('craco-alias')

module.exports = {
    style: {
        postcss: postcssConfig,
    },
    plugins: [
        {
            plugin: cracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
    ],
}
