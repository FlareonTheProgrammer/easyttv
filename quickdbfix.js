const fs = require("fs");
function qdbfix() {
    if (fs.existsSync(`${__dirname}/json.sqlite`) && !fs.existsSync("./json.sqlite")) {
        console.log("[DEBUG] \x1b[36mjson.sqlite file found in easyttv module folder, attempting to move it...\x1b[0m");
        try {
            fs.renameSync(`${__dirname}/json.sqlite`, "./json.sqlite");
            return console.log("[SUCCESS] Moved json.sqlite to project root folder.");
        }
        catch (err) { console.error("[ERROR] \x1b[33mFailed to move json.sqlite. Reason:\x1b[0m", err); }
    }
    else if (fs.existsSync("./json.sqlite") && fs.existsSync(`${__dirname}/json.sqlite`)) {
        return console.warn("[WARN] \x1b[33mjson.sqlite file found in root folder, refusing to overwrite it due to potential for data loss.\x1b[0m")
    }
    else {
        return console.warn("[WARN]\x1b[33m No json.sqlite file found.\x1b[0m")
    }
}
module.exports = qdbfix;