import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sortDropdown = page.locator('select[name="sort"]');
    this.productNames = page.locator('.card-title');
    this.productPrices = page.locator('.card-text >> nth=1');
    this.searchInput = page.locator('input[placeholder="Search"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async sortByNameAZ() {
    await this.sortDropdown.selectOption('name-asc');
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('price-desc');
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map(p =>
      Number(p.replace('$', '').trim())
    );
  }

  async searchFor(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }
}
