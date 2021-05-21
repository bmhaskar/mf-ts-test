const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const manifest = require("./package.json");
const depRemoteURL = process.env.DEP_REMOTE_URL || "http://localhost:5000"
const selfRemoteURL = process.env.SELF_REMOTE_URL || "http://localhost:5002"


const getModuleFedrtionPlugin =  (env,argv) => {
  let remotes  = {};
  const peerDeps = manifest.peerDependencies;
  remotes = Object.keys(peerDeps).reduce((remotes, dep) => {
      let newEntry = {}
      if (dep.includes('@swsl')) {
        const newEntryName = `${dep}-mf`;
        const libraryName = dep.replace(/@|\/|-/g, '');
        newEntry = {[newEntryName]: `${libraryName}@${depRemoteURL}/${dep}/${peerDeps[dep]}/remoteEntry.js`}
      }
      return {...remotes, ...newEntry}
    }, {});


  return new ModuleFederationPlugin({
    name: manifest.name,
    filename: "remoteEntry.js",
    remotes,
    exposes: {},
    shared: {
      ...manifest.dependencies,
      react: {
        singleton: true,
        eager: true,
        requiredVersion: manifest.dependencies.react,
      },
      "react-dom": {
        singleton: true,
        eager: true,
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
    'entry': './src/libraryIndex.ts',
    output: {
      publicPath: `/`,
      path: path.join(__dirname, 'dist'),
      'filename': 'index.js',
      'libraryTarget': 'umd'
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
    ],
  }
  return config;

}