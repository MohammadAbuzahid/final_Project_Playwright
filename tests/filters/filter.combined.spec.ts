import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { Filters } from '../../pages/components/Filters';

type Case = {
  name: string;
  category: string;
  brand: string;
};

const cases: Case[] = [
  { name: 'Hammer + ForgeFlex Tools', category: 'Hammer', brand: 'ForgeFlex Tools' },
  { name: 'Pliers + ForgeFlex Tools', category: 'Pliers', brand: 'ForgeFlex Tools' },
  { name: 'Drill + ForgeFlex Tools', category: 'Drill', brand: 'ForgeFlex Tools' }
];

test.describe('Filters - multiple cases (category + brand)', () => {
  for (const tc of cases) {
    test(tc.name, async ({ page }) => {
      const products = new ProductsPage(page);
      const filters = new Filters(page);

      await products.goto();
      await products.waitForProductsLoaded();

      const before = await products.productCards().count();
      expect(before).toBeGreaterThan(0);

      await filters.filterByCategory(tc.category);
      await expect(page.getByLabel(tc.category, { exact: true })).toBeChecked();

      await filters.filterByBrand(tc.brand);
      await expect(page.getByLabel(tc.brand, { exact: true })).toBeChecked();

      await products.waitForProductsLoaded();

      const after = await products.productCards().count();
      expect(after).toBeGreaterThan(0);
    });
  }
});
