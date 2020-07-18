// webpack.config.js
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// CSS 抽出は、開発中ではホットリロードされるように、
// 本番環境でのみ有効にする必要があります
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // 重要: style-loader の代わりに vue-style-loader を使用します
        use: isProduction
          ? ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: isProduction
    // プラグインを追加してください！
    ? [new ExtractTextPlugin({ filename: 'common.[chunkhash].css' })]
    : []
}
