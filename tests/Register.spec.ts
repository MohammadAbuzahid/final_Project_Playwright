import { expect,test } from "@playwright/test";
import { fail } from "node:assert";

test.describe('Register Tests Suite', () => {
    test('Register Page', async ({ page }) => {
        await page.goto(process.env.BASE_URL_REGISTER!);
        await page.locator('[data-test="first-name"]').click();
        await page.locator('[data-test="first-name"]').fill('mohammad');
        await page.locator('[data-test="last-name"]').click();
        await page.locator('[data-test="last-name"]').fill('Abuzahid');
        await page.waitForTimeout(3000);
        await page.locator('[data-test="dob"]').click();
        await page.locator('[data-test="dob"]').fill('2002-01-14');
        await page.locator('[data-test="street"]').click();
        await page.locator('[data-test="street"]').fill('palestine');
        await page.locator('[data-test="postal_code"]').click();
        await page.locator('[data-test="postal_code"]').fill('123');
        await page.locator('[data-test="city"]').click();
        await page.waitForTimeout(3000);
        await page.locator('[data-test="city"]').fill('Nablus');
        await page.locator('[data-test="state"]').click();
        await page.locator('[data-test="state"]').fill('Nablus');
        await page.locator('[data-test="country"]').selectOption('PS');
        await page.waitForTimeout(3000);
        await page.locator('[data-test="phone"]').click();
        await page.locator('[data-test="phone"]').fill('0592705836');
        await page.locator('[data-test="email"]').click();
        await page.waitForTimeout(3000);
        await page.locator('[data-test="email"]').fill(process.env.USER_NAME!);
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
        await page.getByRole('button').filter({ hasText: /^$/ }).click();
        await page.getByRole('button').filter({ hasText: /^$/ }).click();
        await page.waitForTimeout(3000);
        await page.locator('[data-test="register-submit"]').click();
    });

    test.fail('empty Register Page', async ({ page }) => {
        await page.goto(process.env.BASE_URL_REGISTER!);
        await page.locator('[data-test="register-submit"]').click();
        expect(page.locator('[data-test="first-name-error"]')).toBeVisible();
        expect(page.locator('[data-test="first-name-error"]')).toContainText('First name is required');
        expect(page.locator('[data-test="last-name-error"]')).toBeVisible();
        expect(page.locator('[data-test="last-name-error"]')).toContainText('Last name is required');
        expect(page.locator('[data-test="dob-error"]')).toBeVisible();
        expect(page.locator('[data-test="dob-error"]')).toContainText('Please enter a valid date in YYYY-MM-DD format.');
        expect(page.locator('[data-test="street-error"]')).toBeVisible();
        expect(page.locator('[data-test="street-error"]')).toContainText('Street is required');
        expect(page.locator('[data-test="postal_code-error"]')).toBeVisible();
        expect(page.locator('[data-test="postal_code-error"]')).toContainText('Postcode is required');
        expect(page.locator('[data-test="city-error"]')).toBeVisible();
        expect(page.locator('[data-test="city-error"]')).toContainText('City is required');
        expect(page.locator('[data-test="state-error"]')).toBeVisible();
        expect(page.locator('[data-test="state-error"]')).toContainText('State is required');
        expect(page.locator('[data-test="country-error"]')).toBeVisible();
        expect(page.locator('[data-test="country-error"]')).toContainText('Country is required');
        expect(page.locator('[data-test="phone-error"]')).toBeVisible();
        expect(page.locator('[data-test="phone-error"]')).toContainText('Phone number is required');
        expect(page.locator('[data-test="email-error"]')).toBeVisible();
        expect(page.locator('[data-test="email-error"]')).toContainText('Email is required');
        expect(page.locator('[data-test="password-error"]')).toBeVisible();
        expect(page.locator('[data-test="password-error"]')).toContainText('Password is required');
        expect(page.locator('[data-test="password-error"]')).toContainText('Password must be minimal 6 characters long.');
        expect(page.locator('[data-test="password-error"]')).toContainText('Password must include invalid characters.');

    });



    test('Register Page invalid email and weak password', async ({ page }) => {
        await page.goto(process.env.BASE_URL_REGISTER!);
        await page.locator('[data-test="first-name"]').click();
        await page.locator('[data-test="first-name"]').fill('mohammad');
        await page.locator('[data-test="last-name"]').click();
        await page.locator('[data-test="last-name"]').fill('Abuzahid');
        await page.waitForTimeout(3000);
        await page.locator('[data-test="dob"]').click();
        await page.locator('[data-test="dob"]').fill('2002-01-14');
        await page.locator('[data-test="street"]').click();
        await page.locator('[data-test="street"]').fill('palestine');
        await page.locator('[data-test="postal_code"]').click();
        await page.locator('[data-test="postal_code"]').fill('123');
        await page.locator('[data-test="city"]').click();
        await page.waitForTimeout(3000);
        await page.locator('[data-test="city"]').fill('Nablus');
        await page.locator('[data-test="state"]').click();
        await page.locator('[data-test="state"]').fill('Nablus');
        await page.locator('[data-test="country"]').selectOption('PS');
        await page.waitForTimeout(3000);
        await page.locator('[data-test="phone"]').click();
        await page.locator('[data-test="phone"]').fill('0592705836');
        await page.locator('[data-test="email"]').click();
        await page.waitForTimeout(3000);
        await page.locator('[data-test="email"]').fill('mohammadhi@gmail.com');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('Hii');
        await page.getByRole('button').filter({ hasText: /^$/ }).click();
        await page.getByRole('button').filter({ hasText: /^$/ }).click();
        await page.waitForTimeout(3000);
        await page.locator('[data-test="register-submit"]').click();
        expect(page.locator('[data-test="password-error"]')).toBeVisible();
        expect(page.locator('[data-test="password-error"]')).toContainText('Password must be minimal 6 characters long.');
        expect(page.locator('[data-test="password-error"]')).toContainText('Password must include invalid');
    });
});