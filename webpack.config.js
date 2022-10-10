var path = require("path");

module.exports = {
  entry: { index: "./src/index", demo: "./src/demo/scripts/example" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: ["BobaFilters"],
    //libraryExport: ["index"],
    libraryTarget: "umd",
  },
  devServer: {
    host: "localhost",
    port: "3000",
    compress: true,
    static: {
      directory: path.resolve(__dirname, "src/demo/"),
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  node: {
    fs: "empty",
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: true,
            },
          },
        ],
      },
      {
        test: /shard1$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
