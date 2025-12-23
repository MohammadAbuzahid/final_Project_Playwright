import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { Filters } from '../../pages/components/Filters';

const categories = ['Hammer', 'Pliers', 'Drill'];

test.describe('Filter products by category (multiple)', () => {
  for (const category of categories) {
    test(`Category: ${category}`, async ({ page }) => {
      const products = new ProductsPage(page);
      const filters = new Filters(page);

      await products.goto();
      await products.waitForProductsLoaded();

      await filters.filterByCategory(category);
      await expect(page.getByLabel(category, { exact: true })).toBeChecked();

      await products.waitForProductsLoaded();
      expect(await products.productCards().count()).toBeGreaterThan(0);
    });
  }
});
