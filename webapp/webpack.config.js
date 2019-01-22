var path = require('path');

var webpackConfig = {
    context: path.resolve(__dirname, "./scripts"),
    entry: ['whatwg-fetch', './app.tsx'],
    output: {
        path: path.resolve(__dirname, "../server/static/dist/js"),
        filename: "easy.bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { /* Loader options go here */ }
            },
            { 
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: { context: path.resolve(__dirname), configFile: 'webapp-tsconfig.json' }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.ts$/, loader: "source-map-loader" }
        ]
    },
    devtool : "source-map",
};

module.exports = webpackConfig;
