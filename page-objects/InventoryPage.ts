import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId("title");
    this.shoppingCart = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addProductToCard(productName: string) {
    await this.page.locator(`#add-to-cart-${productName}`).click();
  }

  async removeProductToCard(productName: string) {
    await this.page.locator(`#remove-${productName}`).click();
  }
}
