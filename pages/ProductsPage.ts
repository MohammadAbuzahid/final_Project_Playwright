import { Page, Locator, expect } from '@playwright/test';
import { Filters } from './components/Filters';


export class ProductsPage {
  readonly page: Page;
  readonly filters: Filters;

  readonly sortSelect: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly searchInput: Locator;


  constructor(page: Page) {
    this.page = page;
    this.filters = new Filters(page);
    this.searchInput = page.getByPlaceholder('Search');

    // Sort dropdown 
    this.sortSelect = page.locator('select.form-select');

    // Products
    this.productNames = page.locator('.card-title');
    this.productPrices = page.locator('.card-body .card-text');
  }

   productCards(): Locator {
    return this.page.locator('[data-test^="product-"]');
  }

   async expectResultsVisible() {
    await expect(this.productCards().first()).toBeVisible();
  }

   async expectResultsCountGreaterThanZero() {
   const count = await this.productCards().count();
   expect(count).toBeGreaterThan(0);
  }

  async goto() {
    await this.page.goto('/#/products');
    await this.productNames.first().waitFor();
    await this.waitForProductsLoaded();
    await expect(this.page.getByRole('heading', { name: 'Filters', exact: true })).toBeVisible();
  }

 async waitForProductsLoaded() {
    await expect(this.productCards().first()).toBeVisible();
  }

async expectAllProductsContain(text: string) {
    const products = this.page.locator('a[href^="/product/"]');
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      await expect(products.nth(i)).toContainText(text);
    }
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
    return (await this.productNames.allTextContents())
      .map(n => n.trim())
      .filter(n => n.length > 0);
  }

  async getProductPrices(): Promise<number[]> {
  const texts = await this.productPrices.allTextContents();

  return texts
    .map(t => t.replace('$', '').trim())
    .filter(t => t !== '')
    .map(Number)
    .filter(n => !isNaN(n));
  }

  async searchFor(keyword: string) {
  const searchInput = this.page.locator('input[placeholder="Search"]');
  await searchInput.fill('');
  await searchInput.fill(keyword);
  await searchInput.press('Enter');

  // Wait for UI to react
  await this.productNames.first().waitFor();
}
  
}
