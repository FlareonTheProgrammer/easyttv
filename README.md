# EasyTTV

## Making the Twitch API easier to use

---

Version: 0.3.1

### Installation

```bash
$ npm install --save FlareonTheProgrammer/easyttv
```

Setup should begin after install. Follow the prompts to set up easyttv for use with the Twitch API.

### To use in your code

```javascript
const { easyttvRq, gme } = require("easyttv");
ettv = new easyttvRq();

console.log(`${JSON.stringify(await ettv.get(gme.user).data({ login: "chefbear" }))}`);
```

For more information, check out the gme file [here](https://github.com/FlareonTheProgrammer/easyttv/blob/master/src/res/get-endpoints.js).
