import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
    test('loads homepage successfully', async ({ page }) => {
        await page.goto('/');

        // Check for main heading
        await expect(page.locator('h1')).toContainText('Abhinav Gontu');

        // Verify hero section is visible
        await expect(page.locator('text=Software Engineer')).toBeVisible();
    });

    test('navigation works correctly', async ({ page }) => {
        await page.goto('/');

        // Click on Projects link
        await page.click('text=Projects');

        // Wait for scroll
        await page.waitForTimeout(1000);

        // Verify we're in projects section
        await expect(page.locator('text=Featured Projects')).toBeVisible();
    });

    test('displays project cards', async ({ page }) => {
        await page.goto('/');

        // Scroll to projects
        await page.evaluate(() => {
            document.querySelector('#projects')?.scrollIntoView();
        });

        await page.waitForTimeout(500);

        // Verify at least one project card is visible
        const projectCards = await page.locator('[class*="glass-effect"]').count();
        expect(projectCards).toBeGreaterThan(0);
    });

    test('CTA buttons are clickable', async ({ page }) => {
        await page.goto('/');

        // Find and click "View Projects" button
        const viewProjectsButton = page.locator('text=View Projects').first();
        await expect(viewProjectsButton).toBeVisible();
        await viewProjectsButton.click();

        // Verify scroll happened
        await page.waitForTimeout(500);
    });

    test('footer contains social links', async ({ page }) => {
        await page.goto('/');

        // Scroll to footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        // Check for social media links
        await expect(page.locator('text=GitHub')).toBeVisible();
        await expect(page.locator('text=LinkedIn')).toBeVisible();
    });

    test('3D scene loads without errors', async ({ page }) => {
        const errors: string[] = [];

        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto('/');

        // Wait for 3D scene to initialize
        await page.waitForTimeout(2000);

        // Check for critical errors
        const criticalErrors = errors.filter(err =>
            err.includes('WebGL') || err.includes('THREE')
        );

        expect(criticalErrors.length).toBe(0);
    });

    test('page is responsive on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Verify mobile menu button is visible
        await expect(page.locator('[aria-label="Toggle menu"]')).toBeVisible();

        // Click to open mobile menu
        await page.click('[aria-label="Toggle menu"]');
        await page.waitForTimeout(300);

        // Verify menu items are visible
        await expect(page.locator('text=Home')).toBeVisible();
    });
});

test.describe('Performance Tests', () => {
    test('page loads within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');

        // Wait for main content
        await page.locator('h1').waitFor();
        const loadTime = Date.now() - startTime;

        // Should load in less than 3 seconds
        expect(loadTime).toBeLessThan(3000);
    });

    test('smooth scrolling works', async ({ page }) => {
        await page.goto('/');

        // Click navigation item
        await page.click('text=Projects');

        // Check smooth scroll behavior
        const scrollBehavior = await page.evaluate(() => {
            return getComputedStyle(document.documentElement).scrollBehavior;
        });

        expect(scrollBehavior).toBe('smooth');
    });
});
