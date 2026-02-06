import { Page } from "@playwright/test";
import { log } from "../../../core/helpers/logger";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string) {
    await log("info", `Navigating to the path: ${path}`);
    await this.page.goto(path);
  }
}
