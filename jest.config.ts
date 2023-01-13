import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts",
  setupFilesAfterEnv: [ "jest-extended/all", "./test/jest.setup.ts" ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|sass|scss)$": "identity-obj-proxy"
  }
};

export default config;
