import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { loginUserData } from "../../data/loginUserData";
import { InventoryPage } from "../../page-objects/InventoryPage";

test("Sort Items by Price - High to Low", async ({ page }) => {
  //Login to Application
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.loginUser(loginUserData);

  //Set 'Price Dropdown' = Price (high to low)
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortItemsByPriceFromHighToLow();
});
