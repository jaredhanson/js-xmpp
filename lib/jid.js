define(function() {

  function JID(node, domain, resource) {
    if (node && !domain && !resource) {
      this._parse(node);
    } else if (domain) {
      this.setNode(node);
      this.setDomain(domain);
      this.setResource(resource);
    }
  }
  
  JID.prototype.setNode = 
  JID.prototype.setUser = function(node) {
    this.node = 
    this.user = node;
  };
  
  JID.prototype.setDomain = function(domain) {
    this.domain = domain;
  };

  JID.prototype.setResource = function(resource) {
    this.resource = resource;
  };
  
  JID.prototype.bare = function() {
    if (this.resource) {
      return new JID(this.node, this.domain, null);
    }
    return this;
  };
  
  JID.prototype.toString = function() {
    var s = this.domain;
    if (this.node) {
      s = this.node + '@' + s;
    }
    if (this.resource) {
      s = s + '/' + this.resource;
    }
    return s;
  };
  
  JID.prototype.equals = function(other) {
    return this.node == other.node &&
      this.domain == other.domain &&
      this.resource == other.resource;
  };
  
  JID.prototype._parse = function(jid) {
    if (jid.indexOf('@') >= 0) {
      this.setNode(jid.substr(0, jid.indexOf('@')));
      jid = jid.substr(jid.indexOf('@') + 1);
    }
    if (jid.indexOf('/') >= 0) {
      this.setResource(jid.substr(jid.indexOf('/') + 1));
      jid = jid.substr(0, jid.indexOf('/'));
    }
    this.setDomain(jid);
  };
  
  return JID;
});
