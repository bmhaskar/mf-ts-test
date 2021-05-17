const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const manifest = require("./package.json");
const depRemoteURL = process.env.DEP_REMOTE_URL || "http://localhost:5000"
const selfRemoteURL = process.env.SELF_REMOTE_URL || "http://localhost:5002"

const getModuleFedrtionPlugin =  (env,argv) => {
  let remotes  = {};
  const peerDeps = manifest.peerDependencies;
  if (argv.mode != "development") {
    remotes = Object.keys(peerDeps).reduce((remotes, dep) => {
      let newEntry = {}
      if (dep.includes('@swsl')) {
        const newEntryName = `${dep}-mf`;
        const libraryName = dep.replace(/@|\/|-/g, '');
        newEntry = {[newEntryName]: `${libraryName}@${depRemoteURL}/${dep}/${peerDeps[dep]}/remoteEntry.js`}
      }
      return {...remotes, ...newEntry}
    }, {});
  } else {
    remotes = {
      "@swsl/ts-remote-mf"  :"swsltsremote@http://localhost:3001/ts-remote/remoteEntry.js"
    }
  }

  return new ModuleFederationPlugin({
    name: "starter",
    filename: "remoteEntry.js",
    remotes,
    exposes: {},
    shared: {
      ...manifest.dependencies,
      react: {
        singleton: true,
        requiredVersion: manifest.dependencies.react,
      },
      "react-dom": {
        singleton: true,
        requiredVersion: manifest.dependencies["react-dom"],
      },
    },
  })
}
module.exports = (env, argv) => {
  const config =  {
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
    output: {
      publicPath: `${selfRemoteURL}/${manifest.name}/${manifest.version}/`,
      path: path.join(__dirname, 'dist', manifest.name, manifest.version)
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
    getModuleFedrtionPlugin(env, argv),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
}

  if(argv.mode == "development") {
    config.devtool = "eval-source-map";
    config.devServer = {
      port: 3002
    }
    config.output.publicPath = `http://localhost:3002/`
  }
  return config;
};
