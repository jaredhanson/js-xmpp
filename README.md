# XMPP

This module implements support for connecting to [XMPP](http://xmpp.org/)
networks.

## Install

##### volo

    $ volo add jaredhanson/js-xmpp xmpp

For more information on using volo to manage JavaScript modules, visit [http://volojs.org/](http://volojs.org/).

## Usage

Create an XMPP connection.

```javascript
var client = xmpp.createConnection({
  jid: 'juliet@jabber.org',
  password: 'secret',
  boshURL: 'http://127.0.0.1:5280/http-bind'
});
```

Send stanzas.

```javascript
var message = xml('message', { to: 'romeo@example.net' })
                .c('body').t('Art thou not Romeo, and a Montague?').root();
client.send(message);
```

Process incoming stanzas.

```javascript
client.on('stanza', function(stanza) {
  // process stanza
});
```

## Implements

This module (partially) conforms to the interface exported by [node-xmpp](https://github.com/astro/node-xmpp).

## Compatibility

##### Browser

This module is [AMD](https://github.com/amdjs/amdjs-api)-compliant, and can be
loaded by module loaders such as [RequireJS](http://requirejs.org/).

This module is optimized for use with [Anchor](https://github.com/anchorjs/anchor).

## See Also

 - [Junction](https://github.com/jaredhanson/junction)
 - [BOSH](https://github.com/jaredhanson/js-bosh)
 - [XML](https://github.com/anchorjs/xml)

## Tests

##### Browser

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari

##### PhantomJS

To run headless tests from a terminal using [PhantomJS](http://phantomjs.org/):

    $ make test-phantomjs

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
