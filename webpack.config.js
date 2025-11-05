const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // ============================================
  // MODE 설정
  // ============================================
  mode: 'development', // 'production' 또는 'development'

  // ============================================
  // ENTRY POINTS
  // ============================================
  entry: {
    main: './src/index.js',
  },

  // ============================================
  // OUTPUT 설정
  // ============================================
  output: {
    path: path.resolve(__dirname, 'build/static'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    publicPath: '/',
    clean: true,
  },

  // ============================================
  // RESOLVE 설정
  // ============================================
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@util': path.resolve(__dirname, 'src/util'),
      '@style': path.resolve(__dirname, 'src/style'),
    },
  },

  // ============================================
  // MODULE RULES
  // ============================================
  module: {
    rules: [
      // JavaScript/JSX 파일 처리
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              'babel-plugin-styled-components'
            ]
          }
        }
      },
      // 이미지 파일 처리
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      },
      // 폰트 파일 처리
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      },
    ]
  },

  // ============================================
  // PLUGINS
  // ============================================
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: 'body',
      favicon: path.resolve(__dirname, 'public/favicon.ico')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: path.resolve(__dirname, 'build'),
          globOptions: {
            ignore: ['**/index.html', '**/favicon.ico']
          }
        }
      ]
    })
  ],

  // ============================================
  // OPTIMIZATION
  // ============================================
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        }
      }
    },
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
  },

  // ============================================
  // DEV SERVER 설정
  // ============================================
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:5000', // 서버 포트에 맞게 수정
        changeOrigin: true,
      }
    ],
  },

  // ============================================
  // DEVTOOL (소스맵)
  // ============================================
  devtool: 'eval-source-map', // production에서는 'source-map' 사용

  // ============================================
  // PERFORMANCE
  // ============================================
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};