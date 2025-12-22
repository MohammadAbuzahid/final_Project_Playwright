import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
  }

  async login(email: string, password: string) {
    await this.page.goto(process.env.BASE_URL_LOGIN!);
    await this.page.waitForTimeout(1000);
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(1000);
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(1000);
    await this.loginButton.click();
    await this.page.waitForTimeout(1000);
    await this.page.locator('[data-test="nav-home"]').click();
    await this.page.waitForTimeout(1000);

  }
}
