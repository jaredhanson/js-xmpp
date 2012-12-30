define(['xmpp'],
function(xmpp) {
  
  describe("xmpp", function() {

    it('should export createConnection', function() {
      expect(xmpp.createConnection).to.exist;
      expect(xmpp.createConnection).to.be.a('function');
    });
    
    it('should export connection constructors', function() {
      expect(xmpp.Client).to.be.a('function');
    });
    
    it('should export JID', function() {
      expect(xmpp.JID).to.be.a('function');
    });
    
    it('should export stanza constructors', function() {
      expect(xmpp.Element).to.be.a('function');
      expect(xmpp.Stanza).to.be.a('function');
      expect(xmpp.Message).to.be.a('function');
      expect(xmpp.Presence).to.be.a('function');
      expect(xmpp.Iq).to.be.a('function');
    });

  });

  return { name: "test.xmpp" }
});
