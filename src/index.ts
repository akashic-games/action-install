import { execSync } from "child_process";
import * as core from "@actions/core";

const inputs = {
	beforeDays: core.getInput("before_days")
};

const BEFORE_DAYS = 7;

/**
 * 今日日付から引数で渡された n 日前の日付を "yyyy-mm-dd" 形式の文字列へ変換し返す。
 */
function makeBeforeDateValue(beforeDays: number): string {
	const dt = new Date();
	dt.setDate(dt.getDate() - beforeDays);
	const beforeDate = dt.toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll("/", "-");
	return beforeDate;
}

try {
	const beforDay = inputs.beforeDays ? parseInt(inputs.beforeDays, 10) : BEFORE_DAYS;
	const beforeDate = makeBeforeDateValue(beforDay);

	const npmInstallCmd = `npm i --before ${beforeDate}`;
	console.log(`- exec: "${npmInstallCmd}"`);
	execSync(npmInstallCmd);

	const gitStatusCmd = "git status --porcelain";
	const result = execSync(gitStatusCmd);
	console.log(`- result: ${result.toString()}`);
	if (result.toString()) {
		console.log(`- npm install results in changes! Run "${npmInstallCmd}" to update package-lock.json`);
		process.exit(1);
	}
} catch (e) {
	console.log("- error:", e);
}
