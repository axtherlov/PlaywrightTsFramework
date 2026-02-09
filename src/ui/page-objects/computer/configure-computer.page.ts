import { Page } from "@playwright/test";
import { Computer } from "../../model/computer";

export class ConfigureComputerPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get processorDropdown() {
    return this.page.locator("select[id*='processor'], select[name*='processor'], [aria-label*='processor']").first();
  }

  get ramDropdown() {
    return this.page.locator("select[id*='ram'], select[name*='ram'], select[id*='memory'], [aria-label*='ram']").first();
  }

  get hddDropdown() {
    return this.page.locator("select[id*='hdd'], select[name*='hdd'], select[id*='storage'], [aria-label*='hdd']").first();
  }

  get osDropdown() {
    return this.page.locator("select[id*='os'], select[name*='os'], [aria-label*='operating system']").first();
  }

  get softwareDropdown() {
    return this.page.locator("select[id*='software'], select[name*='software'], [aria-label*='software']").first();
  }

  async ConfigureComputerOptions(computer: Computer) {
    await this.processorDropdown.selectOption({ index: Number(computer.processor) });      
    await this.ramDropdown.selectOption({ index: Number(computer.ram) });      
    await this.hddDropdown.selectOption({ index: Number(computer.hdd) });      
    await this.osDropdown.selectOption({ index: Number(computer.os) });      
    await this.softwareDropdown.selectOption({ index: Number(computer.software) });     
   }
}
