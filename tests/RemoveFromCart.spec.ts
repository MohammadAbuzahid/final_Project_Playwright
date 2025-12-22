import { test, expect } from '@playwright/test';


const products = [
  { name: 'Combination Pliers', quantity: 1 },
  { name: 'Slip Joint Pliers', quantity: 2 },
  { name: 'Hammer', quantity: 1 }
];

test.describe('Cart Flow', () => {

  test('Add products then remove them (logged in)', async ({ page }) => {
    await page.goto(process.env.BASE_URL_HOME!);

    for (const product of products) {
      const productCard = page
        .locator('[data-test^="product-"]')
        .filter({ hasText: product.name })
        .first();

      await productCard.click();
      await page.locator('input[type="number"]').fill(product.quantity.toString());
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: 'Add to cart' }).click();
      await page.waitForTimeout(1000);
      if (product === products[products.length - 1]) {
          await page.locator('[data-test="nav-cart"]').click();
      } else {
      await page.goto(process.env.BASE_URL_HOME!);
      }
    }

    for (const product of products) {
      const cartItem = page
        .locator('[data-test^="cart-item"]')
        .filter({ hasText: product.name });

      await page.locator('.btn.btn-danger').first().click();
      await page.waitForTimeout(1000);
      await expect(cartItem).toHaveCount(0);
    }
  });

  test.fail('Cart should be empty for guest user', async ({ page }) => {

    await page.goto(process.env.BASE_URL_HOME!);

    await expect(
      page.getByText('Your cart is empty', { exact: false })
    ).toBeVisible();
  });

});
