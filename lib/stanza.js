define(['exports',
        'xml',
        'class'],
function(exports, xml, clazz) {

  function Stanza(name, attrs) {
    xml.Document.call(this, name, attrs);
  }
  clazz.inherits(Stanza, xml.Document);
  
  function Message(attrs) {
    Stanza.call(this, 'message', attrs);
  }
  clazz.inherits(Message, Stanza);
  
  function Presence(attrs) {
    Stanza.call(this, 'presence', attrs);
  }
  clazz.inherits(Presence, Stanza);
  
  function Iq(attrs) {
    Stanza.call(this, 'iq', attrs);
  }
  clazz.inherits(Iq, Stanza);


  exports.Stanza = Stanza;
  exports.Message = Message;
  exports.Presence = Presence;
  exports.Iq = Iq;
});
