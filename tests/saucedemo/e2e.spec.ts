import test, { expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/saucedemo/LoginPage";
import { InventoryPage } from "../../page-objects/saucedemo/InventoryPage";
import { CartPage } from "../../page-objects/saucedemo/CartPage";
import { CheckoutPage } from "../../page-objects/saucedemo//CheckoutPage";

test.describe("E2E Tests", async () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto(process.env.URL!);
    await loginPage.login(process.env.USER_STANDARD!, process.env.PASSWORD!);
  });

  test("Complete checkout flow", async () => {
    for (const item of [
      "sauce-labs-backpack",
      "sauce-labs-fleece-jacket",
      "sauce-labs-bolt-t-shirt",
    ]) {
      await inventoryPage.addProductToCart(item);
    }
    let actual = await inventoryPage.shoppingCart.innerText();
    expect(actual).toBe("3");
    await inventoryPage.removeProductToCart("sauce-labs-bolt-t-shirt");
    actual = await inventoryPage.shoppingCart.innerText();
    expect(actual).toBe("2");
    await inventoryPage.shoppingCart.click();
    await expect(await cartPage.getItem("Sauce Labs Backpack")).toBeVisible();
    await expect(
      await cartPage.getItem("Sauce Labs Fleece Jacket")
    ).toBeVisible();
    await cartPage.checkoutBtn.click();
    await checkoutPage.completeCheckoutInfo("Jane", "Doe", "12345");
    await checkoutPage.finishBtn.click();
    await expect(checkoutPage.completeHeader).toBeVisible();
  });
});
