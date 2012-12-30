define(['./connection',
        'sasl-plain',
        'sasl',
        'base64',
        'xml',
        'class',
        'debug'],
function(Connection, PlainMechanism, sasl, base64, xml, clazz, debug) {
  debug = debug('xmpp');
  
  var BIND_STANZA_ID = 'bind'
    , SESSION_STANZA_ID = 'session';

  /**
   * `Client` constructor.
   *
   * @api public
   */
  function Client(options) {
    options = options || {};
    Connection.call(this, options);
    this._wantSE = false;
    
    this.connect();
  }
  clazz.inherits(Client, Connection);
  
  Client.prototype.onMessage = function(stanza) {
    if (stanza.is('features', 'http://etherx.jabber.org/streams')) {
      var mechanisms = []
        , els;
      
      els = stanza.children('mechanisms', 'urn:ietf:params:xml:ns:xmpp-sasl');
      if (els.length) {
        els = els[0].children('mechanism');
        for (var i = 0, len = els.length; i < len; i++) {
          mechanisms.push(els[i].text());
        }
      }
      
      if (stanza.child('session', 'urn:ietf:params:xml:ns:xmpp-session')) {
        this._wantSE = true;
      }
      
      // If the server included SASL mechanisms in stream features, authentication
      // is required before stanzas can be exchanged.
      if (mechanisms.length) {
        this._authenticate(mechanisms);
      } else if (stanza.child('bind', 'urn:ietf:params:xml:ns:xmpp-bind')) {
        this._bind();
      }
    } else if (stanza.is('challenge', 'urn:ietf:params:xml:ns:xmpp-sasl')) {
      this._challenge(base64.decode(stanza.text()));
    } else if (stanza.is('success', 'urn:ietf:params:xml:ns:xmpp-sasl')) {
      this.restart();
    } else if (stanza.is('iq') && stanza.attr('id') === BIND_STANZA_ID) {
      // TODO: handle errors.  parse jid, etc.
      
      debug('resource bound')
      
      if (this._wantSE) {
        this._session();
      } else {
        this.emit('online');
      }
    } else if (stanza.is('iq') && stanza.attr('id') === SESSION_STANZA_ID) {
      // TODO: check for errors
      debug('session established');
      this.emit('online');
    } else {
      Client.super_.prototype.onMessage.call(this, stanza);
    }
  }
  
  Client.prototype._authenticate = function(mechanisms) {
    debug('starting authentication...');
    debug('  offered SASL mechanisms: ' + mechanisms);
    
    // Emit `willAuth`, giving the application a chance to register a custom
    // SASL mechanism factory.
    this.emit('willAuth', mechanisms);
    
    // The application did not register a custom SASL mechanism factory.  Create
    // a default factory and proceed with authentication.
    if (!this._sasl) {
      var factory = new sasl.Factory();
      factory.use(PlainMechanism);
      this.setSASL(factory);
    }
    
    
    var mech = this._mech = this._sasl.create(mechanisms);
    if (!mech) {
      // TODO: abort.
      return;
    }
    
    debug('  chosen SASL mechanism: ' + mech.name);
    var auth = xml('auth', 'urn:ietf:params:xml:ns:xmpp-sasl', { mechanism: mech.name });
    if (mech.clientFirst) {
      var res = mech.response(this._credentials);
      auth.t(base64.encode(res));
    }
    this.send(auth);
  }
  
  Client.prototype._challenge = function(challenge) {
    debug('SASL challenge received: ' + challenge);
  }
  
  Client.prototype._bind = function() {
    debug('binding resource...');
    
    var iq = xml('iq', 'jabber:client', { id: BIND_STANZA_ID, type: 'set' });
    iq.c('bind', 'urn:ietf:params:xml:ns:xmpp-bind');
    
    // TODO: Optionally allow resource to be specifically requested
    
    this.send(iq.root());
  }
  
  Client.prototype._session = function() {
    debug('establishing session...');
    
    var iq = xml('iq', 'jabber:client', { id: SESSION_STANZA_ID, type: 'set' });
    iq.c('session', 'urn:ietf:params:xml:ns:xmpp-session');
    
    this.send(iq.root());
  }

  return Client;
});
