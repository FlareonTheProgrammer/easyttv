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
console.log("Starting test...");
const main_1 = require("../main");
const console_1 = require("console");
const stable = new main_1.easyttvRq();
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const testUserData = yield stable
            .get(main_1.gme.users)
            .data({ login: "chefbear" });
        try {
            console_1.assert(testUserData.id == 217828105);
            console.log("Test passed.");
        }
        catch (error) {
            console.error("Test Failed. Reason: ", error);
        }
    });
})();
//# sourceMappingURL=debug.test.js.map