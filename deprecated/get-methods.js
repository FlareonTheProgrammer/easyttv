const { rqCache } = require("./easyttv");

setRsrc = (rsrc) => {
  rqCache.set("resource", rsrc);
}
class get {
  constructor() {
    rqCache.set("method", "get");
  }
  clips = () => {
    setRsrc("clips");
    return this;
  };
  games = () => {
    setRsrc("games");
    return this;
  };
  topgames = () => {
    setRsrc("games/top");
    return this;
  };
  allStreamTags = () => {
    setRsrc("tags/streams");
    return this;
  };
  users = () => {
    setRsrc("users");
    return this;
  };
}

module.exports = get;