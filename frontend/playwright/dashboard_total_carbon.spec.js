// Playwright E2E test for Dashboard total carbon footprint per user
// Place this file in your Playwright tests folder (e.g., frontend/tests/ or frontend/e2e/)

import { test, expect } from '@playwright/test';

const frontendUrl = 'http://localhost:3000';
const backendApiUrl = 'http://localhost:8080/api/carbon/total/user/demo-user';

test('Dashboard displays correct total carbon footprint from API', async ({ page, request }) => {
  // Go to the Dashboard page
  await page.goto(frontendUrl);

  // Wait for the dashboard to load
  await expect(page.getByText('Total Carbon Footprint')).toBeVisible();

  // Get the value displayed in the dashboard
  const displayedValue = await page.locator('.summary-card.total-carbon .value').innerText();
  console.log('Displayed Value:', displayedValue);

  // Fetch the expected value from backend API
  const response = await request.get(backendApiUrl);
  expect(response.ok()).toBeTruthy();
  const apiValue = await response.text();
  const expectedValue = Number(apiValue).toFixed(4);

  // Assert that the displayed value matches the backend value
  expect(displayedValue).toBe(expectedValue);
});
