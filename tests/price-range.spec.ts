import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Product Price Range (Minimal)', () => {

  test('should display the price range filter section', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();

    // Minimal but valid assertion:
    // Price Range UI exists and is visible
    await expect(
      page.getByText(/price range/i)
    ).toBeVisible();
  });

});
