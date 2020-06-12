const inquirer = require("inquirer");
const { cData } = require("./src/main.js");
const fs = require("fs");

let setup = [
  {
    type: "list",
    name: "proceed",
    message: "Would you like to set up easyTTV at this time?",
    choices: ["Yes", "No"],
  },
];
let clientInfo = [
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
(async function () {
  const beginSetup = await inquirer.prompt(setup);
  if (beginSetup.proceed === "Yes") {
    console.log("Got it. Beginning setup of easyTTV...");
    const resp = await inquirer.prompt(clientInfo);
    cData.set("id", resp.id);
    cData.set("secret", resp.secret);
    console.log("Client data file created.");
    if (fs.existsSync(`./json.sqlite`) && !fs.existsSync("../../json.sqlite")) {
      console.log(
        "[DEBUG] \x1b[36mjson.sqlite file found in easyttv module folder, attempting to move it...\x1b[0m"
      );
      try {
        fs.renameSync("./json.sqlite", "../../json.sqlite");
        return console.log(
          "[SUCCESS] Moved json.sqlite to project root folder."
        );
      } catch (err) {
        console.error(
          "[ERROR] \x1b[33mFailed to move json.sqlite. Reason:\x1b[0m",
          err
        );
      }
    } else if (
      fs.existsSync("./json.sqlite") &&
      fs.existsSync("../../json.sqlite")
    ) {
      return console.warn(
        "[WARN] \x1b[33mjson.sqlite file found in (what is assumed to be) the root folder, refusing to overwrite it due to potential for data loss.\x1b[0m"
      );
    } else {
      return console.warn("[WARN]\x1b[33m No json.sqlite file found.\x1b[0m");
    }
  } else if (beginSetup.proceed === "No") {
    return console.log(
      "Got it. You'll eventually have to do this in order for easyTTV to work."
    );
  }
  return;
})();
