import { FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
    console.log(">> Global setup running...");

    cleanReports();

    const browserProjects = config.projects.filter((p) => p.name !== "api");
    for (const project of browserProjects) {
        await setupBrowserAuth(project.name);
    }

    console.log(">> Completed global setup");
}

function cleanReports() {
    const reportsDir = path.resolve(process.cwd(), "reports");
    if (fs.existsSync(reportsDir)) {
        fs.rmSync(reportsDir, { recursive: true, force: true });
        console.log(">> Reports folder cleaned");
    }
}

async function setupBrowserAuth(browserName: string): Promise<void> {
    // TODO: implement auth when login flow is available.
    // Suggested structure:
    //
    // const authDir = path.resolve(process.cwd(), "auth");
    // fs.mkdirSync(authDir, { recursive: true });
    //
    // const browser = await chromium.launch({ headless: true });
    // const context = await browser.newContext();
    // const page = await context.newPage();
    //
    // await page.goto(process.env.BASE_URL!);
    // ... login steps ...
    //
    // await context.storageState({ path: `auth/${browserName}.json` });
    // await browser.close();

    console.log(`>> Browser auth placeholder: ${browserName} (no auth configured yet)`);
}
