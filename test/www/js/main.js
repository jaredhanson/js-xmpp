require.config({
  baseUrl: 'js/lib',
  paths: {
    'test': '../../..',
    'mocha': 'mocha/mocha',
    'chai': 'chai/chai'
  },
  packages: [
    { name: 'xmpp', location: '../../../..' },
    { name: 'events' },
    { name: 'url' },
    { name: 'ajax' },
    { name: 'xml' },
    { name: 'bosh' },
    { name: 'sasl' },
    { name: 'sasl-plain' },
    { name: 'mocha-cloud', location: '../support', main: 'mocha-cloud' }
  ],
  shim: {
    'mocha': {
      exports: 'mocha'
    }
  }
});

require(['../suite']);

