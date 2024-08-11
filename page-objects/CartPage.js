import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    // Define locators for various elements on the page
    this.itemTitle = page.locator('[data-test="inventory-item-name"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.checkoutButton = page.locator('[id="checkout"]');
  }

  // Verify that the item is in the cart
  itemIsVisibleInCart = async () => {
    await this.itemTitle.waitFor();
    await expect(this.itemTitle).toHaveText("Sauce Labs Backpack");
    await this.itemQuantity.waitFor();
    await expect(this.itemQuantity).toHaveText("1");
    await this.itemPrice.waitFor();
    await expect(this.itemPrice).toHaveText("$29.99");
  };

  // Continue to checkout
  clickCheckout = async () => {
    await this.checkoutButton.waitFor();
    await this.checkoutButton.click();
  };
}
