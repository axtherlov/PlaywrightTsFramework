import { test as base } from "@playwright/test";

export type EnvConfig = {
  envName: string;
  appURL: string;
  dbConfig: {};
  nopCommerceWeb: string;
};

export const test = base.extend<EnvConfig>({
  envName: ["test", { option: true }],
  appURL: ["<ProvideURL>", { option: true }],
  dbConfig: [{}, { option: true }],
  nopCommerceWeb: ["<ProvideURL>", { option: true }],
});
