import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

const brands = ['ForgeFlex Tools', 'MightyCraft Hardware'];

test.describe('Filter products by brand (multiple)', () => {
  for (const brand of brands) {
    test(`Brand: ${brand}`, async ({ page }) => {
      const products = new ProductsPage(page);

      await products.goto();
      await products.waitForProductsLoaded();
      const before = await products.productCards().count();
      expect(before).toBeGreaterThan(0);

      await products.filters.filterByBrand(brand);
      await expect(page.getByLabel(brand, { exact: true })).toBeChecked();

      await products.waitForProductsLoaded();
      const after = await products.productCards().count();
      expect(after).toBeLessThanOrEqual(before);
    });
  }
});
