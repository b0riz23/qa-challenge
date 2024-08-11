import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { loginUserData } from "../../data/loginUserData";
import { InventoryPage } from "../../page-objects/InventoryPage";
import { CartPage } from "../../page-objects/CartPage";
import { CheckoutStepOnePage } from "../../page-objects/CheckoutStepOnePage";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import { CheckoutStepTwoPage } from "../../page-objects/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../../page-objects/CheckoutCompletePage";

test("Complete Order", async ({ page }) => {
  //Test case ID - AUREUM-14
  //Login to Application
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.loginUser(loginUserData);

  //Click [Add to cart] button - add item to
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart();

  //Click [Cart]
  await inventoryPage.navigateToCart();
  const cartPage = new CartPage(page);
  await cartPage.itemIsVisibleInCart();

  //Click [Checkout]
  await cartPage.clickCheckout();

  //Enter data
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const firstName = uniqueNamesGenerator({ dictionaries: [names] });
  const lastName = uniqueNamesGenerator({ dictionaries: [names] });
  const postalCode = "12345";
  await checkoutStepOnePage.enterData(firstName, lastName, postalCode);

  //Click [Continue]
  await checkoutStepOnePage.clickContinue();
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  await checkoutStepTwoPage.assertOrderDetails();

  //Click [Finish]
  await checkoutStepTwoPage.clickFinish();
  const checkoutCompletePage = new CheckoutCompletePage(page);
  await checkoutCompletePage.assertConfirmaitonMessage();
});
