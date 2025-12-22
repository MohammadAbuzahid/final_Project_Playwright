import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";


test.describe('Login Tests Suite', () => {

    test('User is logged in successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.waitForTimeout(3000);
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    });

    test.skip('Login empty email and password', async ({ page }) => {
        await page.goto(process.env.BASE_URL_LOGIN!);
        await page.waitForTimeout(3000);
        await page.locator('[data-test="login-submit"]').click();
        await page.waitForTimeout(3000);
        expect(page.locator('[data-test="email-error"]')).toBeVisible();
        expect(page.locator('[data-test="email-error"]')).toContainText('Email is required');
        await page.waitForTimeout(3000);
        expect(page.locator('[data-test="password-error"]')).toBeVisible();
        expect(page.locator('[data-test="password-error"]')).toContainText('Password is required');
    });

    test('Login empty email', async ({ page }) => {
        await page.goto(process.env.BASE_URL_LOGIN!);
        await page.waitForTimeout(3000);
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
        await page.waitForTimeout(3000);
        await page.locator('[data-test="login-submit"]').click();
        await page.waitForTimeout(3000);
        expect(page.locator('[data-test="email-error"]')).toBeVisible();
        expect(page.locator('[data-test="email-error"]')).toContainText('Email is required');
    });

    test('Login empty password', async ({ page,browserName }) => {
        if(browserName==='chromium'){
            test.skip();
        }
        await page.goto(process.env.BASE_URL_LOGIN!);
        await page.waitForTimeout(3000);
        await page.locator('[data-test="email"]').click();
        await page.locator('[data-test="email"]').fill(process.env.USER_NAME!);
        await page.waitForTimeout(3000);
        await page.locator('[data-test="login-submit"]').click();
        await page.waitForTimeout(3000);
        expect(page.locator('[data-test="password-error"]')).toBeVisible();
        expect(page.locator('[data-test="password-error"]')).toContainText('Password is required');
    });


    test('Login Invalid email', async ({ page }) => {
        await page.goto(process.env.BASE_URL_LOGIN!);
        await page.waitForTimeout(2000);
        await page.locator('[data-test="email"]').click();
        await page.locator('[data-test="email"]').fill('mohammadhijjawi123@gmail.com');
        await page.waitForTimeout(2000);
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
        await page.waitForTimeout(1000);
        await page.locator('[data-test="login-submit"]').click();
        await page.waitForTimeout(2000);
        expect(page.locator('[data-test="login-error"]')).toBeVisible();
        expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    });

    test('Login Invalid Password', async ({ page }) => {
        await page.goto(process.env.BASE_URL_LOGIN!);
        await page.waitForTimeout(2000);
        await page.locator('[data-test="email"]').click();
        await page.locator('[data-test="email"]').fill(process.env.USER_NAME!);
        await page.waitForTimeout(2000);
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('Hiijawi12');
        await page.waitForTimeout(1000);
        await page.locator('[data-test="login-submit"]').click();
        await page.waitForTimeout(1000);
        expect(page.locator('[data-test="login-error"]')).toBeVisible();
        expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    });

    test('Login Invalid email and password', async ({ page }) => {
        await page.goto(process.env.BASE_URL_LOGIN!);
        await page.waitForTimeout(2000);
        await page.locator('[data-test="email"]').click();
        await page.locator('[data-test="email"]').fill("USER_NAME!");
        await page.waitForTimeout(2000);
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill("PASSWORD!");
        await page.waitForTimeout(1000);
        await page.locator('[data-test="login-submit"]').click();
        await page.waitForTimeout(1000);
        expect(page.locator('[data-test="login-error"]')).toBeVisible();
        expect(page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
    });

    test('go to register page ', async ({ page }) => {
        await page.goto(process.env.BASE_URL_LOGIN!);
        await page.waitForTimeout(3000);
        await page.getByText('Not yet an account? Register').click();
        await page.locator('[data-test="register-link"]').click();
    });
});