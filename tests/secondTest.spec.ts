import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
});

test("First test", async ({ page }) => {
  await page.getByText("Form Layouts").click();
});

test("Navigate to Data Picker page", async ({ page }) => {
  await page.getByText("Datepicker").click();
});
