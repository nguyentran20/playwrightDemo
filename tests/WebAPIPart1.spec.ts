import { expect, test, request } from "@playwright/test";
import { APiUtils } from "./utils/APiUtils";
let response: { token: string; orderId: string };

const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }],
};

let token: string;
let orderId: string;

test.beforeAll(async () => {
  const apiContext = await request.newContext({
    baseURL: "https://rahulshettyacademy.com",
  });
  const apiUtils = new APiUtils(apiContext, loginPayload);
  token = await apiUtils.getToken();
  response = await apiUtils.createOrder(orderPayLoad);
});

test("@API Place the order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  //await page.pause();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
