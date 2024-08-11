import { expect } from "@playwright/test";

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;

    // Define locators for various elements on the page
    this.confirmationMessageHeader = page.locator(
      '[data-test="complete-header"]'
    );
    this.confirmationMessageTetx = page.locator('[data-test="complete-text"]');
  }

  // Assert confirmation message
  async assertConfirmaitonMessage() {
    await this.confirmationMessageHeader.waitFor();
    await expect(this.confirmationMessageHeader).toHaveText(
      "Thank you for your order!"
    );
    await this.confirmationMessageTetx.waitFor();
    await expect(this.confirmationMessageTetx).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  }
}
