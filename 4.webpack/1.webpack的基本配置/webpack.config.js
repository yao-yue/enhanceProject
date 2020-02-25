
const {resolve} = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './build.js',
        path: resolve(__dirname, 'build/js')
    },
    module,
    plugins,
    mode: 'development'

}