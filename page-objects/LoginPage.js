export class LoginPage {
  constructor(page) {
    this.page = page;

    // Define locators for various elements on the page
    this.userNameInputField = page.locator('[id="user-name"]');
    this.passwordInputfield = page.locator('[id="password"]');
    this.loginButton = page.locator('[id="login-button"]');
  }

  // Navigate to login page
  navigateToLoginPage = async () => {
    await this.page.goto("https://www.saucedemo.com/");
  };

  // Login to the application
  loginUser = async (loginUserData) => {
    await this.userNameInputField.waitFor();
    await this.userNameInputField.fill(loginUserData.firstName);
    await this.passwordInputfield.waitFor();
    await this.passwordInputfield.fill(loginUserData.password);
    await this.loginButton.waitFor();
    await this.loginButton.click();
  };
}
