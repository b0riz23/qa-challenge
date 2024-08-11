import { expect } from "@playwright/test";

export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;

    // Define locators for various elements on the page
    this.itemTitle = page.locator('[data-test="inventory-item-name"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.paymentInformationLabel = page.locator(
      '[data-test="payment-info-label"]'
    );
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInformationLabel = page.locator(
      '[data-test="shipping-info-label"]'
    );
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.priceTotalLabel = page.locator('[data-test="total-info-label"]');
    this.subTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');

    this.finishButton = page.locator('[id="finish"]');
  }

  // Assert order details
  async assertOrderDetails() {
    await expect(this.itemTitle).toHaveText("Sauce Labs Backpack");
    await this.itemQuantity.waitFor();
    await expect(this.itemQuantity).toHaveText("1");
    await this.itemPrice.waitFor();
    await expect(this.itemPrice).toHaveText("$29.99");
    await expect(this.paymentInformationLabel).toHaveText(
      "Payment Information:"
    );
    await expect(this.paymentInfoValue).toHaveText("SauceCard #31337");
    await expect(this.shippingInformationLabel).toHaveText(
      "Shipping Information:"
    );
    await expect(this.shippingInfoValue).toHaveText(
      "Free Pony Express Delivery!"
    );
    await expect(this.priceTotalLabel).toHaveText("Price Total");
    await expect(this.subTotalLabel).toHaveText("Item total: $29.99");
    await expect(this.taxLabel).toHaveText("Tax: $2.40");
    await expect(this.totalLabel).toHaveText("Total: $32.39");
  }

  // Complete the order
  clickFinish = async () => {
    await this.finishButton.waitFor();
    await this.finishButton.click();
  };
}
