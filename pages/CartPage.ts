import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get cartBtn() {
    return this.page.locator('[data-test="nav-cart"]');
  }

  cartItemByName = (name: string) =>
    this.page.locator('[data-test="cart-item"]').filter({ hasText: name });

  removeBtnByName = (name: string) =>
    this.cartItemByName(name).locator('[data-test="remove-item"]');

  async openCart() {
    await this.cartBtn.waitFor({ state: 'visible' });
    await this.cartBtn.click();
  }

  async verifyProductVisible(name: string) {
    await expect(this.cartItemByName(name)).toBeVisible();
  }

  async removeProduct(name: string) {
    await this.removeBtnByName(name).click();
  }

  async verifyProductNotVisible(name: string) {
    await expect(this.cartItemByName(name)).toHaveCount(0);
  }
}
