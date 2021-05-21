const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const manifest = require("../package.json");
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/**/*.stories.@(js|mdx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    let remotes  = {};
    remotes = {
      "@swsl/ts-remote-mf"  :"swsltsremote@"
    }

    config.plugins.push(
      new ModuleFederationPlugin({
      name: "starter",
      filename: "remoteEntry.js",
      remotes,
      exposes: {},
      shared: {}
    })
    )

    return config;
  }
}