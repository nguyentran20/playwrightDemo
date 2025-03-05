import { test, expect } from "@playwright/test";

test("Check Google homepage title", async ({ page }) => {
  // Navigate to Google
  await page.goto("https://www.google.com");

  // Get the page title
  const title = await page.title();

  // Assert that the title contains "Google"
  expect(title).toContain("Google");
});
