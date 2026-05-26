import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

const environment = process.env.ENVIRONMENT ?? "local";
const environmentPath = `./environments/${environment}.env`;

dotenv.config({ path: environmentPath });

const BROWSERS = (process.env.BROWSERS ?? "chromium")
    .split(",")
    .map((b: string) => b.trim());

const browserProjects = [
    {
        name: "chromium",
        testMatch: /.*(?<!\.api)\.spec\.ts/,
        use: {
            viewport: null,
            launchOptions: {
                args: ["--start-maximized"],
            },
        },
    },
    {
        name: "firefox",
        testMatch: /.*(?<!\.api)\.spec\.ts/,
        use: { ...devices["Desktop Firefox"] },
    },
    {
        name: "edge",
        testMatch: /.*(?<!\.api)\.spec\.ts/,
        use: {
            channel: "msedge",
            viewport: null,
            launchOptions: {
                args: ["--start-maximized"],
            },
        },
    },
];

const apiProject = {
    name: "api",
    testMatch: /.*\.api\.spec\.ts/,
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./src/tests",
    outputDir: "reports/test-results",
    globalTimeout: 10 * 60 * 1000,
    globalSetup: require.resolve("./src/lib/global/global-setup"),
    globalTeardown: require.resolve("./src/lib/global/global-teardown"),
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.ENVIRONMENT,
    /* Retry on CI only */
    retries: process.env.ENVIRONMENT ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.ENVIRONMENT ? 1 : undefined,
    /* expect config */
    expect: {
        timeout: 12_000,
    },
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [
            "html",
            {
                open: "never",
                outputFolder: "reports/playwright-report",
            },
        ],
        [
            "junit",
            {
                outputFile: "reports/junit/results.xml",
            },
        ],
        [
            "allure-playwright",
            {
                resultsDir: "reports/allure-results",
                detail: true,
                suiteTitle: true,
                environmentInfo: {
                    name: "Test",
                    appName: "Demo App",
                    release: "1.1",
                    node_version: process.version,
                },
            },
        ],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "retain-on-failure",
        ignoreHTTPSErrors: true,
        navigationTimeout: 30_000,
        screenshot: "on",
        video: {
            mode: "retain-on-failure",
            show: {
                actions: { position: "top-left" },
            },
        },
    },

    /* Configure projects for major browsers */
    projects: [
        apiProject,
        ...browserProjects.filter((p) => BROWSERS.includes(p.name)),
    ],
});
