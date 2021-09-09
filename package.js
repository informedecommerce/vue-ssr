Package.describe({
  name: 'akryum:vue-ssr',
  version: '0.4.0',
  summary: 'Render Vue server-side',
  git: 'https://github.com/informedecommerce/vue-ssr', 
  documentation: 'README.md',
})

Package.onUse(function (api) {
  api.versionsFrom('1.6.1')
  api.use([
    'isobuild:compiler-plugin@1.0.0',
    'ecmascript',
    'tracker',
    'minimongo',
    'underscore',
    'webapp',
    'mongo',
    'routepolicy',
    'url',
    'akryum:npm-check@0.1.1',
    //'staringatlights:fast-render@3.2.0',
	  'communitypackages:fast-render',
    'ejson',
    'server-render',
  ])
  api.mainModule('server/index.js', 'server')
  api.export('VueSSR', 'server')
})

Npm.depends({
  'vue-server-renderer': '2.6.14',
  'cookie-parser': '1.4.4',
})
