import { FullConfig } from "@playwright/test";
import { exec } from "child_process";

export default async function globalTeardown(config: FullConfig) {
  console.log(">> Global teardown running...");
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(">> Local run detected - starting allure report");
    exec("allure serve", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting allure report: ${error.message}`);
      }
    });
  }
  console.log(">> Completed global teardown");
}
