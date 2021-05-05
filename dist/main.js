"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.easyttvRq = exports.gme = void 0;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const axios_1 = require("axios");
const jsondb_1 = require("jsondb");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const flog = require("flogger");
const cData = new jsondb_1.Database(__dirname, "clientData");
const helixAPI = "https://api.twitch.tv/helix";
/**
 * Custom Authentication Error Class
 *
 * @type {AuthError}
 */
class AuthError extends Error {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(msg, statCode, details, ...params) {
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
function getNewToken() {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default({
            method: "POST",
            url: "https://id.twitch.tv/oauth2/token",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            params: {
                client_id: clientID,
                client_secret: cData.read("secret"),
                grant_type: "client_credentials",
            }
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            if (response.status != 200) {
                throw new AuthError("Authentication failed!", response.status, response.raw_body);
            }
            else {
                cData.write("token", response.body.access_token);
                auth = `Bearer ${cData.read("token")}`;
                flog.custom("TOKEN", "cyan", "SUCCESS: Got token from Twitch and stored it in the database");
            }
        }))
            .catch((err) => {
            if (err instanceof AuthError) {
                flog.error(err);
                throw err;
            }
            else {
                flog.error(err);
            }
        });
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
function checkAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cData.read("token") === undefined) {
            flog.custom("AUTH", "yellow", "No token found in database. Requesting one from Twitch...");
            yield getNewToken();
            return;
        }
        const resp = yield axios_1.default({
            method: "GET",
            url: `${helixAPI}/users?id=4`,
            headers: {
                Authorization: auth,
                "Client-ID": clientID,
            }
        });
        flog.info(`Twitch server responded with code: ${resp.status}`);
        if (resp.status == 401) {
            flog.custom("AUTH", "yellow", "Authentication failed. Requesting new token from Twitch...");
            yield getNewToken();
            return;
        }
        else {
            flog.custom("AUTH", "green", "Authentication successful. No need to request new token.");
            return;
        }
    });
}
// End of Auth Check
//* v0.1.0 (previously BETA)
const get_endpoints_1 = require("./res/get-endpoints");
Object.defineProperty(exports, "gme", { enumerable: true, get: function () { return get_endpoints_1.gme; } });
/**
 * MagicRq
 * * Also known as the thing that makes this work
 *
 * @type {MagicRq}
 */
class MagicRq {
    constructor() {
        //* GET REQUESTS
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.get = (rsrc) => {
            this.method = "get";
            if (JSON.stringify(get_endpoints_1.gme).includes(rsrc)) {
                this.resource = rsrc;
            }
            else {
                throw `"${rsrc}" isn't a valid resource or resource alias.`;
            }
            return this;
        };
        //* POST REQUESTS
        //* DATA FOR TWITCH TO PROCESS
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.data = (queryObject) => __awaiter(this, void 0, void 0, function* () {
            let resp;
            yield checkAuth();
            yield axios_1.default({
                method: "GET",
                baseURL: helixAPI,
                url: this.resource,
                headers: {
                    Authorization: auth,
                    "Client-ID": clientID
                },
                params: queryObject
            })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((response) => {
                flog.custom("MagicRq", "blue", "Response received.");
                resp = response.data.data;
            });
            return resp;
        });
        // End of MagicRq Class
    }
}
exports.easyttvRq = MagicRq;
//# sourceMappingURL=main.js.map