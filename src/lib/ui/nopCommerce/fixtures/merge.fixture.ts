import { mergeTests } from "@playwright/test";
import { test as pomTest } from "./pom.fixture";
import { test as flowTest } from "./flow.fixture";

export const test = mergeTests(pomTest, flowTest);
