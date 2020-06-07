const unirest = require("unirest");
const { checkAuth, helixAPI, auth, clientID } = require("./easyttv.js");
let method = "get";

class get {
  clips = () => {
    this.resource = "clips";
    return this;
  };
  games = () => {
    this.resource = "games";
    return this;
  };
  topgames = () => {
    this.resource = "games/top";
    return this;
  };
  allStreamTags = () => {
    this.resource = "tags/streams";
    return this;
  };
  users = () => {
    this.resource = "users";
    return this;
  };
  /**
  * Beta data
  *
  * @type {Function}
  */
  async data(queryObj) {
    let resp;
    await checkAuth();
    await unirest[this.method](`${helixAPI}/${this.resource}`)
      .headers({
        Authorization: auth,
        "Client-ID": clientID,
      })
      .query(queryObj)
      .send()
      .then((response) => {
        console.log(
          "\x1b[1m\x1b[37m",
          "[" + "\x1b[34m",
          "MagicRq",
          "\x1b[37m" + "]",
          "\x1b[0m\x1b[34m",
          "Response received.\x1b[0m"
        );
        resp = response.body.data[0];
      });
    return resp;
  }
}

module.exports = get;