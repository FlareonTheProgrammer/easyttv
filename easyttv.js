const unirest = require("unirest");
const db = require("quick.db");
const cData = new db.table("cData");
const helixAPI = "https://api.twitch.tv/helix";

// Custom Authentication Error Class
class AuthError extends Error {
  constructor(msg, statCode, details, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }

    this.name = "AuthError";
    this.msg = String(msg);
    this.statCode = Number(statCode);
    this.details = String(details);
  }
}
// End of auth error class

exports.init = function init(id, secret) {
  cData.set("id", id);
  cData.set("secret", secret);
};
const clientID = cData.get("id");

//* Get a token
async function getNewToken() {
  await unirest
    .post("https://id.twitch.tv/oauth2/token")
    .headers({ "Content-Type": "application/x-www-form-urlencoded" })
    .send({
      client_id: clientID,
      client_secret: cData.get("secret"),
      grant_type: "client_credentials",
    })
    .then(async (response) => {
      if (response.status == 401) {
        throw new AuthError(
          "Authentication failed!",
          response.status,
          response.raw_body
        );
      } else {
        await cData.delete("token");
        await cData.set("token", response.body.access_token);
        auth = `Bearer ${cData.get("token")}`
        console.log("\x1b[32mGot token from Twitch and stored it in the database.\x1b[0m");
      }
    })
    .catch((err) => console.error(err));
}
// End of token request function

let auth = `Bearer ${cData.get("token")}`

//* Check Authorization
async function checkAuth() {
  let respCode;
  if (cData.get("token") === undefined) {
    console.warn("\x1b[37m[\x1b[33m Auth \x1b[37m]\x1b[33mNo token found in database. \x1b[37m- \x1b[0mRequesting one from Twitch...");
    await getNewToken();
    return;
  }
  await unirest
    .get(`${helixAPI}/users?id=4`)
    .headers({
      Authorization: auth,
      "Client-ID": clientID,
    })
    .send()
    .then((response) => {
      respCode = response.code;
    });
  if (respCode == 401) {
    console.warn("\x1b[37m[\x1b[33m Auth \x1b[37m]\x1b[33m Authentication failed. \x1b[37m- \x1b[0mRequesting new token from Twitch...");
    await getNewToken();
    return;
  } else {
    console.log("\x1b[32mAuthentication successful. \x1b[37m- \x1b[0mNo need to request new token.");
    return;
  }
}
// End of Auth Check




/**
 * v0.0.1 Basic Request Method
 *
 * @type {Function}
 */
exports.basicReq = async function ttvBasicReq(method, resource, query, value) {
  let resp;
  await checkAuth();
  await unirest[method](`${helixAPI}/${resource}?${query}=${value}`)
    .headers({
      Authorization: auth,
      "Client-ID": clientID,
    })
    .send()
    .then((response) => {
      resp = response.body;
    });
  return resp;
};


//WIP Beta EasyTTV

/**
 * Bullshit time
 *
 * @type {Object}
 */
class MagicRq {
  constructor() {
    this.get = new (require("./get-methods.js"));
    //this.post = require("./post-methods.js")
  }
}

/**
 * Beta Exports
 *
 * @type {null}
 */

// Export the class
exports.betaReq = MagicRq;

// Export the shit that the request methods need to function
exports.checkAuth = checkAuth;
exports.helixAPI = helixAPI;
exports.auth = auth;