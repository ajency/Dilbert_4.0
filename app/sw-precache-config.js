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
      method: 'get',
      options: {
        cache: {
          name: 'get_api_cache'
        }
      }
    },
    {
      urlPattern: 'api/(.*)',
      handler: "networkFirst",
      method: 'post',
      options: {
        cache: {
          name: 'post_api_cache'
        }
      }
    }
  ],
  verbose: true
};
