import { expect } from "@playwright/test";

export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page;

    // Define locators for various elements on the page
    this.firstNameInputField = page.locator('[id="first-name"]');
    this.lastNameInputField = page.locator('[id="last-name"]');
    this.postalCodeInputField = page.locator('[id="postal-code"]');
    this.continueButton = page.locator('[id="continue"]');
  }

  // Enter data needed for checkout step one
  enterData = async (firstName, lastName, postalCode) => {
    await this.firstNameInputField.waitFor();
    await this.firstNameInputField.fill(firstName);
    await this.lastNameInputField.waitFor();
    await this.lastNameInputField.fill(lastName);
    await this.postalCodeInputField.waitFor();
    await this.postalCodeInputField.fill(postalCode);
  };

  // Continue to checkout step two
  clickContinue = async () => {
    await this.continueButton.waitFor();
    await this.continueButton.click();
  };
}
