module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  moduleFileExtensions: ["js", "jsx"],

  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
  },

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ],

  // Exclude Playwright E2E tests from Jest
  testPathIgnorePatterns: [
    "/node_modules/",
    "/test/e2e/",
    "/playwright-report/",
    "/test-results/"
  ],
};
