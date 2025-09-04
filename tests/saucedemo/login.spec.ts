import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/saucedemo/LoginPage";
import { InventoryPage } from "../../page-objects/saucedemo/InventoryPage";

test.describe.parallel("Login Page", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto(process.env.URL!);
  });

  test("Login as a standard user", async () => {
    await loginPage.login(process.env.USER_STANDARD!, process.env.PASSWORD!);
    expect(inventoryPage.pageTitle.isVisible()).toBeTruthy();
  });

  test("Login as locked out user", async () => {
    await loginPage.login(process.env.USER_LOCKED_OUT!, process.env.PASSWORD!);
    expect(loginPage.loginError.isVisible()).toBeTruthy();
    const errorMsg = await loginPage.loginError.innerText();
    expect(errorMsg).toContain("locked out");
  });
});
