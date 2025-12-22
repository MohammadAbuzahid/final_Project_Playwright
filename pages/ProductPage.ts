import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  addToCartBtn = () => this.page.locator('[data-test="add-to-cart"]');
  increaseQtyBtn = () => this.page.locator('[data-test="increase-quantity"]');
  homeBtn = () => this.page.locator('[data-test="nav-home"]');

  async addToCart(quantity = 1) {
    await this.addToCartBtn().waitFor({ state: 'visible' });

    for (let i = 1; i < quantity; i++) {
      await this.increaseQtyBtn().click();
    }

    await this.addToCartBtn().click();
  }

  async goHome() {
    await this.homeBtn().click();
    await this.page.waitForLoadState('networkidle');
  }
}
