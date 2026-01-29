import { test, expect} from "@playwright/test";
import TestData from "../../data/test-data";

for (const data of TestData.makeAppointment()) {
    test.describe("Parameterized Tests", () => {
       test(`${data.testId}: Should make an appointment with non-default values`, async ({ page }, testInfo) => {
            
            await page.goto("https://katalon-demo-cura.herokuapp.com/");
            await expect(page).toHaveTitle("CURA Healthcare Service");
            await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

            // 2. Click on the Make Appointment
            await page.getByRole("link", { name: "Make Appointment" }).click();
            await expect(page.getByText("Please login to make")).toBeVisible();

            // Successful login
            await page.getByLabel("Username").fill("John Doe");
            await page.getByLabel("Password").fill("ThisIsNotAPassword");
            await page.getByRole("button", { name: "Login" }).click();

            // Access the login cookies
            const loginCookies = await page.context().cookies();
            process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);
            console.log(`>> Login cookies: ${process.env.LOGIN_COOKIES}`);
            
            // Dropdown
            await page.getByLabel("Facility").selectOption(data.facility);

            // Checkbox
            await page.getByText("Apply for hospital readmission").click();

            // Radio button
            await page.getByText(data.hcp).click();

            // Date input box
            await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
            await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill(data.visitDt);
            await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

            // Multi-line comments input box
            await page.getByRole("textbox", { name: "Comment" }).click();
            await page.getByRole("textbox", { name: "Comment" }).fill("This is a multi-line comments\ncaptured by Playwright codegen!");

            // Button
            await page.getByRole("button", { name: "Book Appointment" }).click();

            // Assertion
            await expect(page.locator("h2")).toContainText("Appointment Confirmation");
            await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();
        });
    });
};