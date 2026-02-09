import { Page } from "@playwright/test";
import { Computer } from "../../model/computer";
import { HddEnum } from '../../enums/hdd-enum';
import { OSEnum } from "../../enums/os-enum";
import { softwareEnum } from '../../enums/software-enum';

export class ConfigureComputerPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get processorDropdown() {
    return this.page.getByLabel('Processor');
  }

  get ramDropdown() {
    return this.page.getByLabel('RAM');   
  }

  hddRadio(HddEnum: HddEnum) {
    return this.page.getByText(HddEnum.toString());
  }

  osRadio(os: OSEnum) {    
    return this.page.getByText(os.toString());
  }

  softwareRadio(software: softwareEnum) {
    return this.page.getByText(software.toString());
    
  }

  async ConfigureComputerOptions(computer: Computer) {
    await this.processorDropdown.selectOption({ index: Number(computer.processor) });      
    await this.ramDropdown.selectOption({ index: Number(computer.ram) });      
    await this.hddRadio(computer.hdd).click();
    await this.osRadio(computer.os).click();      
    await this.softwareRadio(computer.software).click();     
   }
}
