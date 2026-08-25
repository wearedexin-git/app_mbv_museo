const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const createVirtualEntryPlugin = require('./entry-plugin')

const rootPath = process.cwd()
const distPath = path.join(rootPath, 'dist')
const srcPath = path.join(rootPath, 'src')

const makeTsLoader = () => ({
  test: /\.ts$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
})

const makeAssetLoader = () => ({
  test: /\..*$/,
  include: [path.join(srcPath, 'asset')],
  loader: path.join(__dirname, 'asset-loader.js'),
})

const config = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: distPath,
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __SENTRY_DSN__: JSON.stringify(process.env.SENTRY_DSN || ''),
      __SENTRY_ENVIRONMENT__: JSON.stringify(process.env.SENTRY_ENVIRONMENT || ''),
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      scriptLoading: 'blocking',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(rootPath, 'external'),
          to: path.join(distPath, 'external'),
          noErrorOnMissing: true,
        },
        {
          from: path.join(srcPath, 'asset'),
          to: path.join(distPath, 'asset'),
          noErrorOnMissing: true,
        },
        { from: path.join(srcPath, 'manifest.json'), to: distPath },
        { from: path.join(srcPath, 'sw.js'), to: distPath },
        {
          from: path.join(srcPath, 'quizbase'),
          to: path.join(distPath, 'quizbase'),
          noErrorOnMissing: true,
        },
        {
          from: path.join(rootPath, 'image'),
          to: path.join(distPath, 'image'),
          noErrorOnMissing: true,
        },
        {
          from: path.join(rootPath, 'image-targets'),
          to: path.join(distPath, 'image-targets'),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      makeTsLoader(),
      makeAssetLoader(),
    ],
  },
  mode: 'production',
  context: srcPath,
  externals: {
    '@8thwall/ecs': 'window.ecs',
  },
  // Evita EMFILE su macOS: troppi watcher su asset/image-targets/.venv
  watchOptions: {
    ignored: [
      '**/node_modules/**',
      '**/.venv/**',
      '**/dist/**',
      '**/.git/**',
      '**/image-targets/**/*.jpg',
      '**/src/asset/**/*.{jpg,jpeg,png,mp3,rtf}',
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    // 'all' copre LAN + tunnel (ngrok / localtunnel). HTTPS obbligatorio su mobile per la camera.
    allowedHosts: 'all',
    open: false,
    compress: true,
    historyApiFallback: true,
    // HMR richiede WebSocket: via tunnel (es. localtunnel) spesso fallisce e inonda la console di errori.
    hot: false,
    liveReload: false,
    static: {
      watch: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      // Evita interstitial warning di ngrok che rompe il load AR
      'ngrok-skip-browser-warning': 'true',
      // Safari tiene il bundle in cache: in locale vogliamo sempre l'ultima versione
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
    client: {
      // Usa host/port della pagina corrente (es. *.loca.lt) per il WS, non localhost.
      webSocketURL: 'auto://0.0.0.0:0/ws',
      overlay: {
        warnings: false,
        // "Script error." da xr.js cross-origin è inutilizzabile e blocca lo schermo su mobile.
        errors: false,
        runtimeErrors: false,
      },
    },
  },
}

module.exports = config
