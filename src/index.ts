import * as core from '@actions/core';
import { execSync } from "child_process";

const inputs = {
	beforeDays: core.getInput("before_days")
};

const BEFORE_DAYS = 7;

function makeBeforeDateValue(beforeDays: number): string {
    const dt = new Date();
    dt.setDate(dt.getDate() - beforeDays);
    const beforeDate = dt.toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-');
    return beforeDate;
}

try {
    const beforDay = inputs.beforeDays ? parseInt(inputs.beforeDays) : BEFORE_DAYS;
    const beforeDate = makeBeforeDateValue(beforDay);
    const npmInstallCmd = `npm i --before ${beforeDate}`;
    console.log(`- exec: "${npmInstallCmd}"`);
    execSync(npmInstallCmd);

    const gitStatusCmd = "git status --porcelain";
    const result = execSync(gitStatusCmd);
    console.log("******[", result.toString(),"]", result.toString().length);
    if (result.toString().length > 0) { 
        console.log(`- npm install results in changes! Run "${npmInstallCmd}" to update package-lock.json`);
        process.exit(1);
    }
    console.log("--- end ---");
} catch (e) { 
    console.log("- error:", e);
}




