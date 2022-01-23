module.exports = {
  devServer: {
    port: 9900,
  },
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}