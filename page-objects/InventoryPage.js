import { expect, firefox } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;

    // Define locators for various elements on the page
    this.addToCartSLBackpackButton = page.locator(
      '[id="add-to-cart-sauce-labs-backpack"]'
    );
    this.removeFromCartSLBackpackButton = page.locator(
      '[id="remove-sauce-labs-backpack"]'
    );
    this.numberOfItemsInCart = page.locator(
      '[data-test="shopping-cart-badge"]'
    );
    this.cart = page.locator('[id="shopping_cart_container"]');
    this.productSortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );
    this.inventoryItemPrice = page.locator(
      '[data-test="inventory-item-price"]'
    );
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
  }

  //Define the addItemToCart method for adding the backpack to the cart
  addItemToCart = async () => {
    await this.addToCartSLBackpackButton.waitFor();
    await this.addToCartSLBackpackButton.click();
    await this.removeFromCartSLBackpackButton.waitFor();
    await expect(this.removeFromCartSLBackpackButton).toHaveText("Remove");
    await this.numberOfItemsInCart.waitFor();
    await expect(this.numberOfItemsInCart).toHaveText("1");
  };

  // Define the navigateToCart method for navigating to the shopping cart
  navigateToCart = async () => {
    await this.cart.waitFor();
    await this.cart.click();
  };

  sortItemsByPriceFromHighToLow = async () => {
    // Wait for the product sort dropdown to be available in the DOM.
    await this.productSortDropdown.waitFor();

    // Wait for the first inventory item price element to be available in the DOM.
    await this.inventoryItemPrice.first().waitFor();

    // Get the text content of all inventory item prices before sorting.
    const itemPriceBeforeSorting =
      await this.inventoryItemPrice.allTextContents();

    // Select the sorting option "Price (high to low)" from the product sort dropdown.
    await this.productSortDropdown.selectOption("Price (high to low)");

    // Get the text content of all inventory item prices after sorting.
    const itemPriceAfterSorting =
      await this.inventoryItemPrice.allTextContents();

    // Convert prices to numbers for comparison
    const pricesBeforeSorting = itemPriceBeforeSorting.map((price) =>
      parseFloat(price.replace("$", ""))
    );
    const pricesAfterSorting = itemPriceAfterSorting.map((price) =>
      parseFloat(price.replace("$", ""))
    );

    // Check if prices are sorted in descending order after sorting
    const isSortedDescending = pricesAfterSorting.every(
      (price, index) => index === 0 || pricesAfterSorting[index - 1] >= price
    );

    // Expect the items to be sorted in descending order
    expect(isSortedDescending).toBe(true);

    // Optionally, check that the prices have changed after sorting
    expect(pricesAfterSorting).not.toEqual(pricesBeforeSorting);
  };

  sortItemsByNameFromZToA = async () => {
    // Wait for the product sort dropdown to be available in the DOM.
    await this.productSortDropdown.waitFor();

    // Wait for the first inventory item name element to be available in the DOM.
    await this.inventoryItemName.first().waitFor();

    // Get the text content of all inventory item names before sorting.
    const itemNamesBeforeSorting =
      await this.inventoryItemName.allTextContents();

    // Select the sorting option "Name (Z to A)" from the product sort dropdown.
    await this.productSortDropdown.selectOption("Name (Z to A)");

    // Get the text content of all inventory item names after sorting.
    const itemNamesAfterSorting =
      await this.inventoryItemName.allTextContents();

    // Check if names are sorted in descending order (Z to A) after sorting
    const isSortedDescending = itemNamesAfterSorting.every(
      (name, index) =>
        index === 0 || itemNamesAfterSorting[index - 1].localeCompare(name) >= 0
    );

    // Expect the items to be sorted in descending order (Z to A)
    expect(isSortedDescending).toBe(true);

    // Optionally, check that the names have changed after sorting
    expect(itemNamesAfterSorting).not.toEqual(itemNamesBeforeSorting);
  };
}
