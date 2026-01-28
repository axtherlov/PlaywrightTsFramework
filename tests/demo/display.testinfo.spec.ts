import { test, devices } from "@playwright/test";
import constants from "../../data/constants.json";

test("Should display testInfo (config)", async ({}, testInfo) => {
  console.log(`>> Test info: ${JSON.stringify(testInfo.config)}`);
});

test("Should display constant values",  async ({}) => {
  console.log(`>> Constants data: ${JSON.stringify(constants.STATUSCODES)}`);
});
