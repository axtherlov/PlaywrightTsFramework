import { test as customTest } from "@playwright/test";
import { MainFlow } from "../flows/main.flow";
import { CartFlow } from "../flows/cart.flow";

type Flows = {
    mainFlow: MainFlow;
    cartFlow: CartFlow;
};

const flows = customTest.extend<Flows>({
    mainFlow: async ({ page }, use) => {
        const mainFlow = new MainFlow(page);
        await use(mainFlow);
    },
    cartFlow: async ({ page }, use) => {
        await use(new CartFlow(page));
    },
});

export const test = flows;
