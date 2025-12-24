import { Page, expect } from '@playwright/test';

export class Filters {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async filterByCategory(categoryName: string) {
    const checkbox = this.page.getByLabel(categoryName, { exact: true });
    await expect(checkbox).toBeVisible();
    await checkbox.check();
  }

  async filterByBrand(brandName: string) {
    const checkbox = this.page.getByLabel(brandName, { exact: true });
    await expect(checkbox).toBeVisible();
    await checkbox.check();
  }
}
