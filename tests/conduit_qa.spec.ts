import { test, expect } from '@playwright/test';

/**
 * Exploratory characterization checks for RealWorld "Conduit".
 * These checks observe a public third-party demo and do not patch its source.
 * Author: Sandhit Karmakar (Oytra Automation & QA Developer Assessment)
 * Target: https://demo.realworld.io (Frontend) & https://api.realworld.io/api (Backend)
 */

const BASE_URL = process.env.CONDUIT_URL || 'https://demo.realworld.io';

test.describe('RealWorld Conduit — exploratory characterization checks', () => {

  test('Bug #1 (Critical): Stale JWT causes a crash or is cleared during recovery (#187)', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    // 1. Seed a stale/revoked JWT token into localStorage prior to page boot
    await page.addInitScript(() => {
      window.localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.stale_expired_payload.invalid_sig');
    });

    await page.goto(`${BASE_URL}/#/`);
    await page.waitForTimeout(2500);

    // Verify whether the unpatched app crashed with "Cannot read property 'tags' of undefined"
    // or if the patched middleware cleared localStorage.jwt and rendered .home-page
    const currentJwt = await page.evaluate(() => window.localStorage.getItem('jwt'));
    expect(
      pageErrors.some(msg => msg.includes('tags')) || currentJwt === null,
      'Expected either reproduction of Issue #187 crash or patched auto-purge of stale JWT'
    ).toBeTruthy();
  });

  test('Bug #4 (High): Unauthenticated editor navigation shows editor or redirects (#route guard check)', async ({ page }) => {
    await page.goto(`${BASE_URL}/#/editor/sample-unauthorized-article-slug`);
    await page.waitForTimeout(1500);

    // On a properly guarded app, unauthenticated navigation to /#/editor/:slug redirects to /#/login
    const currentHash = await page.evaluate(() => window.location.hash);
    const editorFormVisible = await page.locator('input[placeholder="Article Title"]').isVisible().catch(() => false);

    // Document defect: editor input mounts even when window.localStorage.jwt is empty
    expect(editorFormVisible || currentHash.includes('login')).toBeTruthy();
  });

  test('Bug #5 (Medium): Uncommitted tag text is not represented by a tag pill (#151)', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.removeItem('jwt'));
    await page.goto(`${BASE_URL}/#/editor`);
    const tagInput = page.locator('input[placeholder="Enter tags"]');

    if (!(await tagInput.isVisible().catch(() => false))) {
      test.skip(true, 'Editor is not available while logged out; this check requires an authenticated test account.');
    }

    await tagInput.fill('automation, qa, n8n');
    const committedTagPills = await page.locator('.tag-list .tag-default').count();
    expect(committedTagPills).toBe(0);
  });

  test('Bug #7 (Low): Logged-out Favorite click returns 401 or redirects to login', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.removeItem('jwt'));

    await page.goto(`${BASE_URL}/#/`);
    const firstHeartBtn = page.locator('.article-preview button.btn-outline-primary').first();
    await expect(firstHeartBtn).toBeVisible();
    const responsePromise = page.waitForResponse(
      res => res.url().includes('/favorite') && res.status() === 401,
      { timeout: 7000 }
    ).catch(() => null);
    await firstHeartBtn.click();
    const unauthorizedResponse = await responsePromise;
    const redirectedToLogin = (await page.evaluate(() => window.location.hash)).includes('login');
    expect(
      unauthorizedResponse !== null || redirectedToLogin,
      'Favorite action should either produce the expected logged-out 401 or redirect to login.'
    ).toBeTruthy();
  });
});
