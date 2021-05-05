import { prompt } from "inquirer";
import { Database } from "jsondb";
const cData = new Database(`${__dirname}/..`, "clientData");

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
(async function () {
  const beginSetup = await prompt(setup);
  if (beginSetup.proceed === "Yes") {
    console.log("Got it. Beginning setup of easyTTV...\n");
    console.log(
      "If you don't have a Twitch application, you can create one at https://dev.twitch.tv"
    );
    const resp = await prompt(clientInfo);
    cData.overwrite({
      id: resp.id,
      secret: resp.secret,
    });
    console.log("Client data file created.");
  } else if (beginSetup.proceed === "No") {
    return console.log(
      "Got it. You'll eventually have to do this in order to make easyTTV work."
    );
  }
  return;
})();
