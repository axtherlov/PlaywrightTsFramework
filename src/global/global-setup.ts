import { chromium, FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
import { globalState } from "./global-state";

export default async function globalSetup(config: FullConfig) {
    console.log(">> Global setup running...");

    const { storageState, headless } = config.projects[0].use;

    globalState.browser = await chromium.launch({ headless });
    const context = await globalState.browser.newContext();
    const page = await context.newPage();

    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        const resultsDir = path.resolve(process.cwd(), "allure-results");

        if (fs.existsSync(resultsDir)) {
            fs.rmSync(resultsDir, { recursive: true, force: true });
            console.log(">> Allure report result deleted for local run");
        }
    }
    console.log(">> Completed global setup");
}
