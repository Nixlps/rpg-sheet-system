const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    entry: "./src/index.js",
    
    mode: "development",
    
    target: "web",
    
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: '/'
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
    ],
    
    resolve: {
      extensions: [".js", ".jsx"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },

        {
          test: /\.(css|s[ac]ss)$/i,
          exclude: /node_modules/,
          use: [
              'style-loader', 
              'css-loader',
              'sass-loader',
          ],
        },
      
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },

        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
        },

        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ]
    },
    devServer: {
      historyApiFallback: true,
    }
  }
]