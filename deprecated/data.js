const unirest = require("unirest");
const { auth, checkAuth, clientID, helixAPI, rqCache } = require("../src/easyttv");

/**
   * Beta data
   *
   * @type {Function}
   */
async function data() {
  let resp;
  await checkAuth;
  await unirest[rqCache.get("method")](`${helixAPI}/${rqCache.get("resource")}`)
    .headers({
      Authorization: auth,
      "Client-ID": clientID,
    })
    .query(rqCache.get("query"))
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

module.exports = data();