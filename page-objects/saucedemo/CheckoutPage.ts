import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckoutPage extends BasePage {
  readonly continueBtn: Locator;
  readonly finishBtn: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.continueBtn = page.locator("#continue");
    this.finishBtn = page.locator("#finish");
    this.completeHeader = page.locator("[data-test='complete-header']");
  }

  async completeCheckoutInfo(firstName: string, lastName: string, zip: string) {
    await this.page.fill("#first-name", firstName);
    await this.page.fill("#last-name", lastName);
    await this.page.fill("#postal-code", zip);
    await this.continueBtn.click();
  }
}
