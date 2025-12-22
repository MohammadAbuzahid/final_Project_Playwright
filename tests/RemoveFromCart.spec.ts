import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Remove From Cart (POM)', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  });

  test('Remove product from cart', async ({ page }) => {
    const home = new HomePage(page);
    const productPage = new ProductPage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.openProductByName('Hammer');
    await productPage.addToCart();

    await cart.openCart();
    await cart.verifyProductVisible('Hammer');

    await cart.removeProduct('Hammer');

    await cart.verifyProductNotVisible('Hammer');
  });
});
