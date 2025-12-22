import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const products = [
  { name: 'Combination Pliers', quantity: 1 },
  { name: 'Slip Joint Pliers', quantity: 2 },
  { name: 'Hammer', quantity: 1 }
];

test.describe('Add to Cart', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    await page.goto(process.env.BASE_URL_HOME!);
  });

  test('Add multiple products to cart', async ({ page }) => {

    for (const product of products) {

      const productCard = page
        .locator('[data-test^="product-"]')
        .filter({ hasText: product.name })
        .first();

      await expect(productCard).toBeVisible();
      await productCard.click();

      await page.locator('input[type="number"]').fill(product.quantity.toString()); 
      await page.waitForTimeout(1000); 
      await page.getByRole('button', { name: 'Add to cart' }).click(); 
      await page.waitForTimeout(1000); 
      await page.goto(process.env.BASE_URL_HOME!); 
      if (product === products[products.length - 1]) { 
        await page.locator('[data-test="nav-cart"]').click(); 
      }else{ 
        await page.goto(process.env.BASE_URL_HOME!); 
      } 
    }
  });

});
