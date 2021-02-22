const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

const apps = fs.readdirSync(path.resolve(__dirname, "apps"))

const entry = {}
apps.forEach(app => {
  entry[app] = path.resolve(__dirname, "apps", app, 'index.js')
})

const options = {
  entry,
  output: {
    filename: '[name].js'
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '01-2d',
      filename: '01-2d.html',
      template: path.resolve(__dirname, "apps", '01-2d', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      title: '02-3d-cube',
      filename: '02-3d-cube.html',
      template: path.resolve(__dirname, "apps", '02-3d-cube', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: path.resolve(__dirname, 'index.html'),
      chunks: []
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "static"),
    watchOptions: {
      poll: true
    },
    before: (app) => {
      app.get('/', (req, res) => {
        let content = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        const menuStr = apps.map(app => `<li><a class='menu-item' data-link='${app}'>${app}</a></li>`).join('\n')
        content = content.replace("__MENU__", menuStr)

        res.send(content)
      })

      apps.forEach(dir => {
        app.get('/' + dir, (req, res) => {
          let content = fs.readFileSync(path.resolve(__dirname, 'apps', dir, "index.html"), 'utf-8')
          console.log(dir, ' dir')
          let index = content.lastIndexOf('</script>')
          if (index !== -1) {
            // 如果有</script>
            index = index + 9 // 9为</script>字符长度
          } else {
            // 如果没有</script>，查找</body>
            index = content.lastIndexOf('</body>')
            if (index === -1) {
              // 如果没有</body>，查找</html>
              index = content.lastIndexOf('</html>')
              if (index === -1) {
                // 如果没有</html>，查找内容长度
                index = content.length
              } else {
                index = index + 7 // 7为</html>字符长度
              }
            } else {
              index = index + 7 // 7为</body>字符长度
            }
          }
          console.log(index, ' index')

          content = `${content.slice(0, index)}<script src="${dir}.js"></script>${content.slice(index)}`

          // content = content.replace("index", dir)

          function replaceShader(pattern, base) {
            const reg = new RegExp(pattern)
            if (content.match(reg)) {
              const regWithName = new RegExp(pattern + "\\((.*)\\)")
              const m = content.match(
                regWithName
              )
              let name = base + ".glsl"
              let short = ''
              if (m && m[1]) {
                short = m[1]
                name = base + "-" + m[1] + ".glsl"
              }

              const program = fs.readFileSync(
                path.resolve(
                  __dirname,
                  "apps",
                  dir,
                  name
                ),
                "utf-8"
              )
              if (short) {
                content = content.replace(
                  `${pattern}(${short})`,
                  program
                )
              } else {
                content = content.replace(
                  pattern,
                  program
                )
              }
              return true
            }
            return false
          }

          while (replaceShader('__VERTEX_SHADER__', 'vertex'));
          while (replaceShader('__FRAGMENT_SHADER__', 'frag'));
          res.send(content)
        })
      })
    },
    compress: true,
    port: 3000
  },
}

console.log('ok')

module.exports = options
