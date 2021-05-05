console.log("Starting test...");

import { easyttvRq, gme } from "../main";
import { assert } from "console";

const stable = new easyttvRq();
(async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const testUserData: any = await stable
    .get(gme.users)
    .data({ login: "chefbear" });
  try {
    assert(testUserData.id == 217828105);
    console.log("Test passed.");
  } catch (error) {
    console.error("Test Failed. Reason: ", error);
  }
})();
