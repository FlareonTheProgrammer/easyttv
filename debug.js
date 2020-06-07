const easyttv = require("./easyttv.js");
const { betaReq } = require("./easyttv");
beta = new betaReq();
async function test() {
  console.log("\n\x1b[35m\x1b[1m[ v0.0.1 Request ]")
  console.log(
    `\x1b[35m\x1b[1muserData\x1b[37m: \x1b[0m${JSON.stringify(await easyttv.basicReq("get", "users", "login", "chefbear"))}`
  );
  console.log("\n\x1b[37m-------------------------------------------------------\x1b[0m\n");
  console.log("\x1b[36m\x1b[1m[ Beta Request ]");
  console.log(
    `\x1b[36m\x1b[1muserDataBeta\x1b[37m: \x1b[0m${JSON.stringify(await beta.get.users.data({ login: "chefbear" }))}`, "\n"
  );
};
test();