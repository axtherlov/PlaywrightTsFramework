import { FullConfig } from "@playwright/test";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export default async function globalTeardown(_config: FullConfig) {
    console.log(">> Global teardown running...");

    const environment = process.env.ENVIRONMENT ?? "local";
    if (environment.toUpperCase() === "LOCAL") {
        serveAllureReport();
    }

    console.log(">> Completed global teardown");
}

function serveAllureReport() {
    const testResultsDir = path.resolve(process.cwd(), "reports/allure-results");
    const hasResults =
        fs.existsSync(testResultsDir) &&
        fs.readdirSync(testResultsDir).some((entry) =>
            fs.statSync(path.join(testResultsDir, entry)).isDirectory(),
        );

    if (!hasResults) {
        console.log(">> No test results found - skipping allure report");
        return;
    }

    console.log(">> Local run detected - starting allure report");
    const child = spawn("allure", ["serve", "reports/allure-results"], {
        detached: true,
        stdio: "ignore",
        shell: true,
    });
    child.unref();
}
