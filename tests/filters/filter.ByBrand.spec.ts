import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { Filters } from '../../pages/components/Filters';

const brands = ['ForgeFlex Tools', 'MightyCraft Hardware'];

test.describe('Filter products by brand (multiple)', () => {
  for (const brand of brands) {
    test(`Brand: ${brand}`, async ({ page }) => {
      const products = new ProductsPage(page);
      const filters = new Filters(page);

      await products.goto();
      await products.waitForProductsLoaded();

      await filters.filterByBrand(brand);
      await expect(page.getByLabel(brand, { exact: true })).toBeChecked();

      await products.waitForProductsLoaded();
      expect(await products.productCards().count()).toBeGreaterThan(0);
    });
  }
});
