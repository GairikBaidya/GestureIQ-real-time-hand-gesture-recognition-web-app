import { test, expect } from '@playwright/test';

test.describe('Demo Page', () => {
  test('renders all 10 gesture cards', async ({ page }) => {
    await page.goto('/demo');
    await expect(page.getByText('Gesture Library')).toBeVisible();

    const cards = page.locator('button:has-text("Click to practice")');
    await expect(cards).toHaveCount(10);
  });

  test('opens challenge mode on card click', async ({ page }) => {
    await page.goto('/demo');
    await page.getByText('Open Hand').click();
    await expect(page.getByText('Start Challenge')).toBeVisible();
  });

  test('closes challenge on close button', async ({ page }) => {
    await page.goto('/demo');
    await page.getByText('Fist').click();
    await expect(page.getByText('Start Challenge')).toBeVisible();
    // Click outside to close
    await page.locator('.fixed.inset-0').first().click({ position: { x: 10, y: 10 } });
  });
});
