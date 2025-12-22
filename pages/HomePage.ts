import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
    await this.page.waitForLoadState('networkidle');
  }

  async openProductByName(name: string) {
    const product = this.page
      .getByRole('link', { name })
      .first();

    await product.waitFor({ state: 'visible' });
    await product.click();
  }
}
