const path = require("path");
const WebpackObfuscator = require("webpack-obfuscator");

module.exports = (env) => {
    const isDevMode = env.mode === "development";
    let useSettings;

    if (isDevMode) {
        useSettings = "ts-loader";
    } else {
        useSettings = [
            {
                loader: WebpackObfuscator.loader,
                options: {
                    rotateStringArray: true,
                },
            },
            "ts-loader",
        ];
    }

    return {
        mode: env.mode,
        entry: "./src/ts/app.ts",
        devtool: isDevMode ? "eval-source-map" : false,
        output: {
            filename: "[name].js",
            sourceMapFilename: "[file].map[query]",
            path: path.resolve(__dirname, "dist"),
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: useSettings,
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
    };
};
