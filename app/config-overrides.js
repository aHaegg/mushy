const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
  if (env === 'production') {
    // Find and remove the default HtmlWebpackPlugin
    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof HtmlWebpackPlugin)
    );

    // Add your custom HTML Webpack Plugins
    config.plugins.push(
      new HtmlWebpackPlugin({
        inject: false,
        template: 'public/index.html', // Plain version
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/app/index.html', // With JS bundle
        filename: 'app/index.html',
      })
    );
  }
  return config;
};
