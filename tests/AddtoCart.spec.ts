import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

const products = [
  {
    id: 'product-01KD1J8S8DVHQ30XC10G5HWMXF',
    name: 'Combination Pliers',
    quantity: 1
  },
  {
    id: 'product-01KD1J8S942S9GNEGZP7N1FRB8',
    name: 'Slip Joint Pliers',
    quantity: 2
  },
  {
    id: 'product-01KD1J8S9ANARW8PDXNS438EB9',
    name: 'Hammer',
    quantity: 1
  }
];

test.describe('Add to Cart (POM)', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.waitForTimeout(1000);
    await loginPage.login(process.env.USER_NAME!,process.env.PASSWORD!);
    await page.waitForTimeout(1000);
  });

  test('Add multiple products to cart', async ({ page }) => {
  const home = new HomePage(page);
  const productPage = new ProductPage(page);
  const cart = new CartPage(page);

  await home.goto();

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    await home.openProductByName(product.name);
    await productPage.addToCart(product.quantity);    
    await page.waitForTimeout(1000);
    await productPage.goHome();
  }

  await cart.openCart();

  for (const product of products) {
    await cart.verifyProductVisible(product.name);
  }
});


});