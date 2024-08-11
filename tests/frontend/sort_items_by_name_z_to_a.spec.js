import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { loginUserData } from "../../data/loginUserData";
import { InventoryPage } from "../../page-objects/InventoryPage";

test("Sort Items by Name - Z to A", async ({ page }) => {
  //Login to Application
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.loginUser(loginUserData);

  //Set 'Price Dropdown' = Name (Z to A)
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortItemsByNameFromZToA();
});
