import { test, expect } from '@playwright/test';

test.describe('Gesture Recognition Page', () => {
  test('page loads correctly', async ({ page }) => {
    await page.goto('/app');
    await expect(page.locator('h1')).toContainText('Gesture Recognition');
  });

  test('shows enable camera button', async ({ page }) => {
    await page.goto('/app');
    await expect(page.getByRole('button', { name: /enable camera/i })).toBeVisible();
  });

  test('settings panel opens and closes', async ({ page }) => {
    await page.goto('/app');
    await page.getByLabel('Open settings').click();
    await expect(page.getByText('Show Skeleton Overlay')).toBeVisible();
    await page.getByLabel('Close settings').click();
  });
});
