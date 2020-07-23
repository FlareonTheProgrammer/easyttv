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
const inquirer_1 = require("inquirer");
const jsondb_1 = require("jsondb");
const fs_1 = require("fs");
const cData = new jsondb_1.Database(`../${__dirname}`, "clientData");
const setup = [
    {
        type: "list",
        name: "proceed",
        message: "Would you like to set up easyTTV at this time?",
        choices: ["Yes", "No"],
    },
];
const clientInfo = [
    {
        type: "input",
        name: "id",
        message: "Please enter the client id of your TTV application.",
    },
    {
        type: "input",
        name: "secret",
        message: "Please enter the client secret of your TTV application.",
    },
];
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs_1.existsSync(`../${__dirname}/clientData.json`)) {
            return;
        }
        else {
            const beginSetup = yield inquirer_1.prompt(setup);
            if (beginSetup.proceed === "Yes") {
                console.log("Got it. Beginning setup of easyTTV...");
                const resp = yield inquirer_1.prompt(clientInfo);
                cData.overwrite({
                    id: resp.id,
                    secret: resp.secret,
                });
                console.log("Client data file created.");
            }
            else if (beginSetup.proceed === "No") {
                return console.log("Got it. You'll eventually have to do this in order to make easyTTV work.");
            }
            return;
        }
    });
})();
//# sourceMappingURL=setup.js.map