## Playwright TypeScript Test Framework

This repository contains automation framework built with Playwright and TypeScript. It is designed to run UI and API tests for multiple test environments with reusable test utilities, structured test data, allure reporting and integrated with Github Actions

## What This Project Includes

- Playwright-based automated UI and API testing
- TypeScript test implementation and shared helpers
- Environment-specific configuration files in the environments folder
- Test data management in the data folder
- Reporting support through Playwright reports and Allure result artifacts
- CI pipeline support through Jenkins and GitHub Actions workflow files

## Repository Layout

- src: main folder that contains lib and tests
- lib: ui and api framework that consists on page-objects, fixtures, hooks, helpers, config, api services, payloads
- tests: Test specifications
- environments: Target environment variable files
- reports: Generated execution reports and artifacts
- SUT: System under test called EAWebApp which is a product CRUD web app that includes API swagger. This is dockerized

## SUTs used

There are 2 SUT used: EAWebApp and NopCommerce, so you'll see folder organization in lib and test folder based on these two systems. Keep in mind they need to be running locally to pass the test successfully

## Setup

1. Install Node.js LTS and npm.
2. Install project dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Configure environment variables:

- example.env has the expected variable list
- crea

5. Start required SUT services (EAWebApp and/or NopCommerce).

For EAWebApp (Dockerized), from the SUT folder:

```bash
cd SUT
docker compose up -d
```

6. Run tests: (below command will run tests for EAWebApp)

```bash
npx playwright test
```

7. Open the Playwright HTML report after execution:

```bash
npx run report:pw
```

8. Open the Allure report after execution

```bash
npx run report:allure
```
