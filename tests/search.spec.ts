import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Product Search', () => {

  test('should update results when searching for a valid keyword', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();

    const beforeSearch = (await productsPage.getProductNames())
      .map(n => n.trim().toLowerCase());

    await productsPage.searchFor('hammer');

    const afterSearch = (await productsPage.getProductNames())
      .map(n => n.trim().toLowerCase());

    // Results should be present
    expect(afterSearch.length).toBeGreaterThan(0);

    // At least one result should be relevant
    const hasRelevantResult = afterSearch.some(name => name.includes('hammer'));
    expect(hasRelevantResult).toBeTruthy();
  });

  test('should handle invalid search keyword gracefully', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();
    await productsPage.searchFor('zzzzzz-invalid');

    const names = await productsPage.getProductNames();

    // App should not crash; either shows no results or fallback list
    expect(names).toBeDefined();
  });


});
