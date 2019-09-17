const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|dist|.storybook/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        loader: "less-loader", // compiles Less to CSS
        options: {
          modifyVars: {
            "primary-color": "red",
            "link-color": "blue",
            "border-radius-base": "2px"
          },
          javascriptEnabled: true
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/server": {
        target: "http://localhost:3333/",
        ws: true,
        pathRewrite: {
          "^/server": "/"
        }
      }
    }
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      application: path.resolve(__dirname, "src/application/"),
      config: path.resolve(__dirname, "src/config/"),
      services: path.resolve(__dirname, "src/services/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      util: path.resolve(__dirname, "src/util/")
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./template/index.html",
      filename: "./index.html"
    })
  ]
};
