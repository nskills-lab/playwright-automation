import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CartPage extends BasePage {
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutBtn = page.locator("#checkout");
  }

  async getItem(name: string) {
    return this.page.getByText(name);
  }
}
