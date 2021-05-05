"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as unirest from "unirest";
import { Database } from "jsondb";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as flog from "flogger";

const cData = new Database(__dirname, "clientData");
const helixAPI = "https://api.twitch.tv/helix";

/**
 * Custom Authentication Error Class
 *
 * @type {AuthError}
 */
class AuthError extends Error {
  msg: string;
  statCode: number;
  details: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(msg: string, statCode: number, details: string, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }

    this.name = "AuthError";
    this.msg = msg;
    this.statCode = statCode;
    this.details = details;
  }
}

const clientID = cData.read("id");

/**
 * Token Getter Function
 *
 *  If request for token is denied, throw custom auth error
 *
 * @type {Function}
 */
async function getNewToken() {
  await unirest
    .post("https://id.twitch.tv/oauth2/token")
    .headers({ "Content-Type": "application/x-www-form-urlencoded" })
    .send({
      client_id: clientID,
      client_secret: cData.read("secret"),
      grant_type: "client_credentials",
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then(async (response: any) => {
      if (response.status != 200) {
        throw new AuthError(
          "Authentication failed!",
          response.status,
          response.raw_body
        );
      } else {
        cData.write("token", response.body.access_token);
        auth = `Bearer ${cData.read("token")}`;
        flog.custom(
          "TOKEN",
          "cyan",
          "SUCCESS: Got token from Twitch and stored it in the database"
        );
      }
    })
    .catch((err: Error) => {
      if (err instanceof AuthError) {
        flog.error(err);
        throw err;
      } else {
        flog.error(err);
      }
    });
}

/**
 * Authentication Header Value
 *
 * This is a very useful value to have on hand, it saves a lot of typing later on.
 *
 * @type {string}
 */
let auth = `Bearer ${cData.read("token")}`;

/**
 * Check Authorization before carrying out any requests
 *
 * If auth fails, ask twitch for new token by calling newToken();
 *
 * @type {Function}
 */
async function checkAuth() {
  if (cData.read("token") === undefined) {
    flog.custom(
      "AUTH",
      "yellow",
      "No token found in database. Requesting one from Twitch..."
    );
    await getNewToken();
    return;
  }
  const resp = await unirest
    .get(`${helixAPI}/users?id=4`)
    .headers({
      Authorization: auth,
      "Client-ID": clientID,
    })
    .send();

  flog.info(`Twitch server responded with code: ${resp.code}`);
  if (resp.code == 401) {
    flog.custom(
      "AUTH",
      "yellow",
      "Authentication failed. Requesting new token from Twitch..."
    );
    await getNewToken();
    return;
  } else {
    flog.custom(
      "AUTH",
      "green",
      "Authentication successful. No need to request new token."
    );
    return;
  }
}
// End of Auth Check

//* v0.1.0 (previously BETA)

import { gme } from "./res/get-endpoints";

/**
 * MagicRq
 * * Also known as the thing that makes this work
 *
 * @type {MagicRq}
 */
class MagicRq {
  method: string | undefined;
  resource: string | undefined;
  //* GET REQUESTS
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get = (rsrc: string) => {
    this.method = "get";
    if (JSON.stringify(gme).includes(rsrc)) {
      this.resource = rsrc;
    } else {
      throw `"${rsrc}" isn't a valid resource or resource alias.`;
    }
    return this;
  };

  //* POST REQUESTS

  //* DATA FOR TWITCH TO PROCESS
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data = async (queryObject: Record<string, unknown>) => {
    let resp;
    await checkAuth();
    await unirest[this.method](`${helixAPI}/${this.resource}`)
      .headers({
        Authorization: auth,
        "Client-ID": clientID,
      })
      .query(queryObject)
      .send()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: any) => {
        flog.custom("MagicRq", "blue", "Response received.");
        resp = response.body.data;
      });
    return resp;
  };
  // End of MagicRq Class
}

/**
 * v0.1.0 Exports
 *
 * @type {any}
 */
export { MagicRq as easyttvRq };
