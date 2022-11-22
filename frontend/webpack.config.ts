import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const IS_PRODUCTION = process.env.production || !process.env.development

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const webpackConfig = (): Configuration => ({
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:9229',
    },
  },
  optimization: IS_PRODUCTION
    ? {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 250000
        }
      }
    : {},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          IS_PRODUCTION ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase'
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10240,
              iesafe: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.svg', '.css', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
})

export default webpackConfig
