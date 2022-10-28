const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
    output: {
        publicPath:
            argv.mode == "development"
                ? "http://localhost:8000/"
                : "https://micro-frontend-1.vercel.app/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 8000,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "cms",
            filename: "remoteEntry.js",
            remotes: {
                /* canva:
                    argv.mode == "development"
                        ? "Canva@http://localhost:3000/remoteEntry.js"
                        : "Canva@https://micro-frontend-2.vercel.app/remoteEntry.js", */
                store:
                    argv.mode == "development"
                        ? "Store@http://localhost:3000/remoteEntry.js"
                        : "Store@https://micro-frontend-2.vercel.app/remoteEntry.js",
            },
            exposes: {},
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
});
