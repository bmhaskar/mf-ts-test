const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const remoteURL = process.env.REMOTE_URL || "http://localhost:5000"
const manifest = require("./package.json");
module.exports = (env, argv)  => {
  const libraryName = manifest.name.replace(/@|\/|-/g,'');
  const config = {
    output: {
      publicPath: `${remoteURL}/${manifest.name}/${manifest.version}/`,
      path: path.join(__dirname, 'dist', manifest.name, manifest.version)
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
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
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
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
        name: libraryName,
        filename: "remoteEntry.js",
        library: {type: 'umd', 'name':  libraryName},
        remotes: {},
        exposes: {
          "./ToDos": "./src/ToDos",
          "./ToDoListView": "./src/ToDoListView"
        },
        shared: {
          ...manifest.dependencies,
          react: {
            singleton: true,
            requiredVersion: manifest.dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: manifest.dependencies["react-dom"],
          }

        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  }

  if(argv.mode == "development") {
    config.devtool =  "eval-source-map";
    config.devServer = {
      port: 3001
    }
    config.output.publicPath = `http://localhost:3001/${manifest.name.replace('@swsl/','')}`;
  }
  return config;
};
