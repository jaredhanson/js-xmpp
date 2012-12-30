define(['exports',
        './lib/client',
        './lib/jid',
        './lib/stanza',
        'xml'],
function(exports, Client, JID, stanza, xml) {

  function createConnection(options, cb) {
    if (typeof options == 'function') {
      cb = options;
      options = {};
    }
    
    var c = new Client(options);
    if (cb) c.on('online', cb);
    return c;
  }

  exports.createConnection = createConnection;
  exports.Client = Client;
  exports.JID = JID;
  
  exports.Element = xml.Document;
  exports.Stanza = stanza.Stanza;
  exports.Message = stanza.Message;
  exports.Presence = stanza.Presence;
  exports.Iq = stanza.Iq;
});
