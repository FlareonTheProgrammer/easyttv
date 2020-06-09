const inquirer = require("inquirer");
const { cData } = require("./src/main.js");

let setup = [
    {
        type: "list",
        name: "proceed",
        message: "Would you like to set up easyTTV at this time?",
        choices: ["Yes", "No"]
    }
];
let clientInfo = [
    {
        type: "input",
        name: "id",
        message: "Please enter the client id of your TTV application."
    },
    {
        type: "input",
        name: "secret",
        message: "Please enter the client secret of your TTV application."
    }
];

(async function () {
    const beginSetup = await inquirer.prompt(setup);
    if (beginSetup.proceed === "Yes") {
        console.log("Got it. Beginning setup of easyTTV...");
        const resp = await inquirer.prompt(clientInfo);
        cData.set("id", resp.id);
        cData.set("secret", res.secret);
        return console.log("Setup complete!");
    }
    else if (beginSetup.proceed === "No") {
        return console.log("Got it. Remember to import init in order to set up easyTTV, you'll only have to do it once.")
    }
    return;
});