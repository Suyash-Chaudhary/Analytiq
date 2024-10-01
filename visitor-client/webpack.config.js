const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "analytiq-client.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    redis: "undefined", // Exclude redis from the bundle
  },
};
