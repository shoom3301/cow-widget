const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development'

  return {
    entry: isDevMode ? './src/demo.ts' : './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      library: 'cowSwapWidget',
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: isDevMode ? [new HtmlWebpackPlugin()] : [],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3012,
    },
  }
}
