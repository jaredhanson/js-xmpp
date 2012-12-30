define(['xmpp/lib/jid'],
function(JID) {
  
  describe("JID", function() {
  
    describe('constructed with string containing domain', function() {
      var jid = new JID('example.com');
    
      it('should set node', function() {
        expect(jid.node).to.be.undefined;
        expect(jid.user).to.be.undefined;
      });
      
      it('should set domain', function() {
        expect(jid.domain).to.equal('example.com');
      });
      
      it('should not set resource', function() {
        expect(jid.resource).to.be.undefined;
      });
      
      it('should return correct bare JID', function() {
        expect(jid.bare().toString()).to.equal('example.com');
      });
      
      it('should compare correctly', function() {
        expect(jid.equals(new JID(null, 'example.com'))).to.be.true;
        expect(jid.equals(new JID('user', 'example.com'))).to.be.false;
        expect(jid.equals(new JID('user', 'example.com', 'tablet'))).to.be.false;
      });
      
      it('should convert to string', function() {
        expect(jid.toString()).to.equal('example.com');
      });
    });
  
    describe('constructed with string containing node and domain', function() {
      var jid = new JID('user@example.com');
    
      it('should set node', function() {
        expect(jid.node).to.equal('user');
        expect(jid.user).to.equal('user');
      });
      
      it('should set domain', function() {
        expect(jid.domain).to.equal('example.com');
      });
      
      it('should not set resource', function() {
        expect(jid.resource).to.be.undefined;
      });
      
      it('should return correct bare JID', function() {
        expect(jid.bare().toString()).to.equal('user@example.com');
      });
      
      it('should compare correctly', function() {
        expect(jid.equals(new JID('user', 'example.com'))).to.be.true;
        expect(jid.equals(new JID('user', 'example.com', 'tablet'))).to.be.false;
      });
      
      it('should convert to string', function() {
        expect(jid.toString()).to.equal('user@example.com');
      });
    });
    
    describe('constructed with string containing node, domain, and resource', function() {
      var jid = new JID('user@example.com/mobile');
    
      it('should set node', function() {
        expect(jid.node).to.equal('user');
        expect(jid.user).to.equal('user');
      });
      
      it('should set domain', function() {
        expect(jid.domain).to.equal('example.com');
      });
      
      it('should set resource', function() {
        expect(jid.resource).to.equal('mobile');
      });
      
      it('should return correct bare JID', function() {
        expect(jid.bare().toString()).to.equal('user@example.com');
      });
      
      it('should compare correctly', function() {
        expect(jid.equals(new JID('user', 'example.com', 'mobile'))).to.be.true;
        expect(jid.equals(new JID('user', 'example.com', 'tablet'))).to.be.false;
      });
      
      it('should convert to string', function() {
        expect(jid.toString()).to.equal('user@example.com/mobile');
      });
    });
  
    describe('constructed with node and domain', function() {
      var jid = new JID('user', 'example.com');
    
      it('should set node', function() {
        expect(jid.node).to.equal('user');
        expect(jid.user).to.equal('user');
      });
      
      it('should set domain', function() {
        expect(jid.domain).to.equal('example.com');
      });
      
      it('should not set resource', function() {
        expect(jid.resource).to.be.undefined;
      });
      
      it('should return correct bare JID', function() {
        expect(jid.bare().toString()).to.equal('user@example.com');
      });
      
      it('should compare correctly', function() {
        expect(jid.equals(new JID('user', 'example.com'))).to.be.true;
        expect(jid.equals(new JID('user', 'example.com', 'tablet'))).to.be.false;
      });
      
      it('should convert to string', function() {
        expect(jid.toString()).to.equal('user@example.com');
      });
    });

    describe('constructed with node, domain, and resource', function() {
      var jid = new JID('user', 'example.com', 'mobile');
    
      it('should set node', function() {
        expect(jid.node).to.equal('user');
        expect(jid.user).to.equal('user');
      });
      
      it('should set domain', function() {
        expect(jid.domain).to.equal('example.com');
      });
      
      it('should set resource', function() {
        expect(jid.resource).to.equal('mobile');
      });
      
      it('should return correct bare JID', function() {
        expect(jid.bare().toString()).to.equal('user@example.com');
      });
      
      it('should compare correctly', function() {
        expect(jid.equals(new JID('user', 'example.com', 'mobile'))).to.be.true;
        expect(jid.equals(new JID('user', 'example.com', 'tablet'))).to.be.false;
      });
      
      it('should convert to string', function() {
        expect(jid.toString()).to.equal('user@example.com/mobile');
      });
    });

  });

  return { name: "test.xmpp.jid" }
});
