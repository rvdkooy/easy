var path = require('path');
console.log(path.resolve(__dirname, "./webapp/scripts"));
var webpackConfig = {
    context: path.resolve(__dirname, "./webapp/scripts"),
    entry: ['whatwg-fetch', './app.tsx'],
    output: {
        path: path.resolve(__dirname, "./server/static/dist/js"),
        filename: "easy.bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: { configFileName: 'webapp-tsconfig.json' }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.ts$/, loader: "source-map-loader" }
        ]
    }
};

module.exports = webpackConfig;