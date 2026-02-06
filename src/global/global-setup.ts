import { FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  console.log(">> Global setup running...");
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    const resultsDir = path.resolve(process.cwd(), "allure-results");

    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
      console.log(">> Allure report result deleted for local run");
    }
  }
  console.log(">> Completed global setup");
}
