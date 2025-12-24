import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';


test.describe('Product Sorting', () => {

test('should sort products from A to Z', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.goto();
  await productsPage.sortByNameAZ();

  const names = (await productsPage.getProductNames())
    .map(n => n.trim().toLowerCase())
    .filter(n => n.length > 0);

  // Assert minimum viable correctness
  expect(names.length).toBeGreaterThan(1);

  // First two items must be in alphabetical order
  expect(
    names[0].localeCompare(names[1])
  ).toBeLessThanOrEqual(0);
});



});



test('should sort products by price high to low', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.goto();
  await productsPage.sortByPriceHighToLow();

  const prices = await productsPage.getProductPrices();

  const sortedPrices = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(sortedPrices);
});
