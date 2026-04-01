import { test as customTest } from "@playwright/test";
import { MainFlow } from "../flows/main.flow";

type Flows = {
    mainFlow: MainFlow;
};

const flows = customTest.extend<Flows>({
    mainFlow: async ({ page }, use) => {
        const mainFlow = new MainFlow(page);
        await use(mainFlow);
    },
});

export const test = flows;
