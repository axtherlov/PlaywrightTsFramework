import test, { Locator, Page } from "@playwright/test";
import { Computer } from "../../model/computer";
import { HddEnum } from "../../enums/hdd-enum";
import { OSEnum } from "../../enums/os-enum";
import { softwareEnum } from "../../enums/software-enum";

export class ConfigureComputerPage {
    constructor(private readonly page: Page) {}

    // ==================== Locators ====================

    /** Processor selection dropdown. */
    get processorDropdown(): Locator {
        return this.page.locator("#product_attribute_1");
    }

    /** RAM selection dropdown. */
    get ramDropdown(): Locator {
        return this.page.locator("#product_attribute_2");
    }

    // ==================== Locator methods ====================

    /**
     * Returns the HDD radio button for the given option.
     * @param {HddEnum} hdd - The HDD option to locate.
     * @returns {Locator}
     */
    hddRadio(hdd: HddEnum): Locator {
        return this.page.getByRole("radio", { name: hdd.toString() });
    }

    /**
     * Returns the OS radio button for the given option.
     * @param {OSEnum} os - The OS option to locate.
     * @returns {Locator}
     */
    osRadio(os: OSEnum): Locator {
        return this.page.getByRole("radio", { name: os.toString() });
    }

    /**
     * Returns the software checkbox for the given option.
     * @param {softwareEnum} software - The software option to locate.
     * @returns {Locator}
     */
    softwareCheckbox(software: softwareEnum): Locator {
        return this.page.getByRole("checkbox", { name: software.toString() });
    }

    // ==================== Actions ====================

    /**
     * Configures all computer options (processor, RAM, HDD, OS, software).
     * @param {Computer} computer - The configuration options to apply.
     * @returns {Promise<void>}
     */
    async configureComputerOptions(computer: Computer): Promise<void> {
        await test.step(`Step: ${this.configureComputerOptions.name}`, async () => {
            await this.processorDropdown.selectOption({
                index: Number(computer.processor),
            });
            await this.ramDropdown.selectOption({
                index: Number(computer.ram),
            });
            await this.hddRadio(computer.hdd).click();
            await this.osRadio(computer.os).click();
            await this.softwareCheckbox(computer.software).click();
        });
    }
}
