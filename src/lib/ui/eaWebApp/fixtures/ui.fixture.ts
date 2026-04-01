import { mergeTests } from "@playwright/test";
import { test as pomTest } from "./pages.fixture";
import { test as productTest } from "./product.fixture";

export const test = mergeTests(pomTest, productTest);
