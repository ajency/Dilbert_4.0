var packageJson = require('./package.json');

module.exports = {
  cacheId: packageJson.name,
  staticFileGlobs: [
    'manifest.json',
    'build/**.js',
    'build/**.css',
    'assets/img/dilbert.png',
    'assets/i18n/**.json'
  ],
  navigateFallback: 'index.html',
  runtimeCaching: [
    {
      urlPattern: 'assets/**/**.*',
      handler: "networkFirst",
      options: {
        cache: {
          name: 'asset_cache',
        }
      }
    },
    {
      urlPattern: 'api/(.*)',
      handler: "networkFirst",
      options: {
        cache: {
          name: 'api_cache'
        }
      }
    }
  ],
  verbose: true
};
