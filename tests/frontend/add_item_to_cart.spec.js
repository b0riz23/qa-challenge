import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { loginUserData } from "../../data/loginUserData";
import { InventoryPage } from "../../page-objects/InventoryPage";
import { CartPage } from "../../page-objects/CartPage";

test("Add item to cart", async ({ page }) => {
  //Test case ID - AUREUM-10
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
});
