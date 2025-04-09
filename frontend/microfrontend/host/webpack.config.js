const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        auth: "auth@http://localhost:8081/remoteEntry.js",
        cards: "cards@http://localhost:8082/remoteEntry.js",
        footer: "footer@http://localhost:8083/remoteEntry.js",
        header: "header@http://localhost:8084/remoteEntry.js",
        profile: "profile@http://localhost:8085/remoteEntry.js",
        sharedLib: "sharedLib@http://localhost:8090/remoteEntry.js"
      },
      exposes: {
        // "./CurrentUserContext": "../shared/sharedLib/src/contexts/CurrentUserContext",
      },
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
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
        crossOriginLoading: "anonymous",
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
