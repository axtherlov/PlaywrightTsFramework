import { FullConfig } from "@playwright/test";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

export default async function globalTeardown(_config: FullConfig) {
    console.log(">> Global teardown running...");

    const environment = process.env.ENVIRONMENT ?? "local";
    if (environment?.toUpperCase() === "LOCAL") {
        const testResultsDir = path.resolve(process.cwd(), "reports/test-results");
        const hasResults =
            fs.existsSync(testResultsDir) &&
            fs.readdirSync(testResultsDir).some((entry) =>
                fs.statSync(path.join(testResultsDir, entry)).isDirectory(),
            );

        if (hasResults) {
            console.log(">> Local run detected - starting allure report");
            exec("allure serve reports/allure-results", (error) => {
                if (error) {
                    console.error(`Error starting allure report: ${error.message}`);
                }
            });
        } else {
            console.log(">> No test results found - skipping allure report");
        }
    }

    console.log(">> Completed global teardown");
}
