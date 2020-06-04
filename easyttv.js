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
// End of custom class

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
    .then((response) => {
      if (response.status == 401) {
        throw new AuthError(
          "Authentication failed!",
          response.status,
          response.raw_body
        );
      } else {
        cData.set("token", response.body.access_token);
        console.log("Got token from Twitch and stored it in the database.");
      }
    })
    .catch((err) => console.error(err));
}
// End of token request function

const auth = `Bearer ${cData.get("token")}`;

//* Check Authorization
async function checkAuth() {
  let respCode;
  if (cData.get("token") === undefined) {
    console.warn("No token found in database. Requesting one from Twitch...");
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
    console.warn("Authentication failed. Requesting new token from Twitch...");
    await getNewToken();
    return;
  } else {
    console.log("Authentication successful. No need to request new token.");
    return;
  }
}
// End of Auth Check

//* Basic Request
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
      return resp;
    });
  console.log(resp);
};
