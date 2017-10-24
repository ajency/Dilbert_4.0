var packageJson = require('./package.json');

module.exports = {
  cacheId: packageJson.name,
  staticFileGlobs: [
    'assets/i18n/**.json',
    'assets/img/dilbert.png',
    'build/**.css',
    'build/**.js',
    'manifest.json'
  ],
  navigateFallback: 'index.html',
  runtimeCaching: [
    {
      urlPattern: 'assets/**/**.*',
      handler: "networkFirst",
      options: {
        cache: {
          name: 'asset_cache'
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
    },
    {
      urlPattern : "https://apis.google.com/js/client.js",
      handler : "networkFirst",
      options : {
        cache : {
          name : 'google_api_cache'
        }
      }
    }
  ],
  verbose: true
};
