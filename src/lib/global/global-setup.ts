import { chromium, FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
import { globalState } from "./global-state";

export default async function globalSetup(config: FullConfig) {
    console.log(">> Global setup running...");

    const { storageState, headless } = config.projects[0].use;

    globalState.browser = await chromium.launch({ headless });
    const context = await globalState.browser.newContext();

    const reportsDir = path.resolve(process.cwd(), "reports");
    if (fs.existsSync(reportsDir)) {
        fs.rmSync(reportsDir, { recursive: true, force: true });
        console.log(">> Reports folder cleaned");
    }
    console.log(">> Completed global setup");
}
