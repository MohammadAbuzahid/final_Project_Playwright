import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly sortSelect: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sort dropdown (this is the real one on the site)
    this.sortSelect = page.locator('select.form-select');

    // Products
    this.productNames = page.locator('.card-title');
    this.productPrices = page.locator('.card-text >> nth=1');
  }

async goto() {
  await this.page.goto('/#/products');
  await this.productNames.first().waitFor();
}



async sortByNameAZ() {
  await this.sortSelect.selectOption({ label: 'Name (A - Z)' });
  await this.productNames.first().waitFor();
}

async sortByPriceHighToLow() {
  await this.sortSelect.selectOption({ label: 'Price (High - Low)' });
  await this.productNames.first().waitFor();
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
}
