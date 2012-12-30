define(['./jid',
        'bosh',
        'events',
        'class',
        'debug'],
function(JID, bosh, Emitter, clazz, debug) {
  debug = debug('xmpp');

  function Connection(options) {
    Emitter.call(this);
    // Merge credentials into `options.credentials`.  This is done for
    // compatibility with node-xmpp.
    options.credentials = options.credentials || {};
    options.credentials.password = options.credentials.password || options.password;
    options.credentials.token = options.credentials.token || options.access_token || options.oauth2_token;
    options.credentials.apiKey = options.credentials.apiKey || options.api_key;
    options.bosh = options.bosh || {};
    options.bosh.url = options.bosh.url || options.boshURL;
    
    if (typeof options.jid == 'string') {
      this.jid = new JID(options.jid);
    } else {
      this.jid = options.jid;
    }
    this._credentials = options.credentials;
    this._credentials.username = this._credentials.username || this.jid.user;
    
    this._bosh = options.bosh;
    this._socket = null;
  }
  clazz.inherits(Connection, Emitter);
  
  /**
   * Connect to XMPP network.
   *
   * This function establishes a connection to the XMPP network using [BOSH](http://xmpp.org/extensions/xep-0124.html)
   * as the underlying transport.  Using BOSH accomodates browser-based
   * runtimes, in which TCP sockets are not available.
   *
   * @api public
   */
  Connection.prototype.connect = function() {
    this._bosh.to = this._bosh.to || this.jid.domain;
    this._bosh.from = this._bosh.from || this.jid.toString();
    this._bosh.protocol = 'xmpp';
  
    var s = bosh.createStream(this._bosh.url, this._bosh);
    this.setSocket(s);
  }
  
  Connection.prototype.send = function(stanza) {
    this._socket.send(stanza);
  }
  
  Connection.prototype.restart = function() {
    this._socket.restart();
  }
  
  Connection.prototype.setSocket = function(socket) {
    this._socket = socket;
    
    var self = this;
    socket.on('message', function(data) {
      var stanza;
      if (data.name && data.namespace) {
        // This data has already been parsed as XML.  This typically happens when
        // using a BOSH binding, in which case an underlying `XMLHttpRequest`
        // parsed the response into a DOM document, set at the `responseXML`
        // property.
        stanza = data;
      }
      
      self.onMessage(stanza);
    });
  }
  
  Connection.prototype.setSASL = function(factory) {
    this._sasl = factory;
  }
  
  Connection.prototype.onMessage = function(stanza) {
    stanza.id = stanza.attr('id');
    stanza.from = stanza.attr('from');
    stanza.to = stanza.attr('to');
    stanza.type = stanza.attr('type');
    
    this.emit('stanza', stanza);
  }

  return Connection;
});
