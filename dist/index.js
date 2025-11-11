"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const child_process_1 = require("child_process");
const inputs = {
    beforeDay: core.getInput("before_day")
};
const BEFORE_DAYS = 7;
function makeBeforeDateValue(beforeDays) {
    const dt = new Date();
    dt.setDate(dt.getDate() - beforeDays);
    const beforeDate = dt.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll('/', '-');
    return beforeDate;
}
try {
    const beforDay = inputs.beforeDay ? parseInt(inputs.beforeDay) : BEFORE_DAYS;
    const beforeDate = makeBeforeDateValue(beforDay);
    const npmInstallCmd = `npm i --before ${beforeDate}`;
    console.log(`- exec: "${npmInstallCmd}"`);
    (0, child_process_1.execSync)(npmInstallCmd);
    const gitStatusCmd = "git status --porcelain";
    const result = (0, child_process_1.execSync)(gitStatusCmd);
    console.log("******[", result.toString(), "]", result.toString().length);
    if (result.toString().length > 0) {
        console.log(`- npm install results in changes! Run "${npmInstallCmd}" to update package-lock.json`);
        process.exit(1);
    }
    console.log("--- end ---");
}
catch (e) {
    console.log("- error:", e);
}
