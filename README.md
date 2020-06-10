# EasyTTV

## Making the Twitch API easier to use

---

Current version: v0.1.2

### Installation

```bash
$ npm install --save FlareonTheProgrammer/easyttv
```

Setup should begin after install. Follow the prompts to set up easyttv for use with the Twitch API.

### To use in your code

```javascript
const { stableReq, gme } = require("easyttv");
ettv = new stableReq();

console.log(await ettv.get(gme.user).data({ login: "chefbear" }));
```

For more information, check out the gme file at ./node_modules/easyttv/src/res/get-endpoints.js
