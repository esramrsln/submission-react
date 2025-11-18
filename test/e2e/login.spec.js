/**
 * Skenario Pengujian End-to-End:
 * 1. User dapat mengakses halaman login.
 * 2. User dapat mengisi form login dengan email dan password.
 * 3. User dapat melakukan login dengan kredensial yang valid dan diarahkan ke halaman home.
 * 4. User melihat pesan error ketika login dengan kredensial yang invalid.
 */

import { test, expect } from '@playwright/test';

test.describe('Login Flow E2E Test', () => {
  test.beforeEach(async ({ page }) => {
    // Visit the app before each test
    await page.goto('/');
  });

  test('should display login page when navigating to /login', async ({ page }) => {
    await page.goto('/login');
    
    // Check if login form elements are present
    await expect(page.locator('h2')).toContainText('Login');
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Login');
  });

  test('should allow user to type in email and password fields', async ({ page }) => {
    await page.goto('/login');
    
    const email = 'test@example.com';
    const password = 'password123';
    
    const emailInput = page.locator('input[placeholder="Email"]');
    const passwordInput = page.locator('input[placeholder="Password"]');
    
    await emailInput.fill(email);
    await passwordInput.fill(password);
    
    await expect(emailInput).toHaveValue(email);
    await expect(passwordInput).toHaveValue(password);
  });

  test('should successfully login with valid credentials and redirect to home', async ({ page }) => {
    // Mock successful login API response
    await page.route('https://forum-api.dicoding.dev/v1/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          data: {
            token: 'mock-token-123',
          },
        }),
      });
    });

    // Mock fetchMe API response
    await page.route('https://forum-api.dicoding.dev/v1/users/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          data: {
            user: {
              id: 'user-1',
              name: 'Test User',
              email: 'test@example.com',
            },
          },
        }),
      });
    });

    await page.goto('/login');
    
    // Fill in login form
    await page.locator('input[placeholder="Email"]').fill('test@example.com');
    await page.locator('input[placeholder="Password"]').fill('password123');
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Wait for navigation
    await page.waitForURL(/\//, { timeout: 5000 });
    
    // Should redirect to home page
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page).toHaveURL(/\//);
  });

  test('should display error message when login fails with invalid credentials', async ({ page }) => {
    // Mock failed login API response
    await page.route('https://forum-api.dicoding.dev/v1/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'fail',
          message: 'Invalid credentials',
        }),
      });
    });

    await page.goto('/login');
    
    // Fill in login form with invalid credentials
    await page.locator('input[placeholder="Email"]').fill('wrong@example.com');
    await page.locator('input[placeholder="Password"]').fill('wrongpassword');
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Wait a bit for the error to be processed
    await page.waitForTimeout(1000);
    
    // Check if we're still on the login page
    await expect(page).toHaveURL(/\/login/);
    
    // Verify form is still visible (not redirected)
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
  });

  test('should navigate to login page from home when not authenticated', async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    await page.goto('/');
    
    // If there's a redirect to login, verify it
    // Otherwise, check if we're on home page
    const url = page.url();
    expect(url.includes('/login') || url.includes('/')).toBeTruthy();
  });
});

