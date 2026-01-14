import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
    test.use({
        viewport: { width: 1920, height: 1080 },
    });

    test('homepage hero section matches baseline', async ({ page }) => {
        await page.goto('/');

        // Wait for 3D scene to stabilize
        await page.waitForTimeout(3000);

        // Take screenshot of hero section
        await expect(page.locator('section').first()).toHaveScreenshot('hero-section.png', {
            maxDiffPixels: 200, // Allow small rendering differences
        });
    });

    test('navigation bar matches baseline', async ({ page }) => {
        await page.goto('/');

        await expect(page.locator('nav')).toHaveScreenshot('navigation.png', {
            maxDiffPixels: 50,
        });
    });

    test('navigation with scroll effect matches baseline', async ({ page }) => {
        await page.goto('/');

        // Scroll down to trigger glassmorphism
        await page.evaluate(() => window.scrollTo(0, 200));
        await page.waitForTimeout(500);

        await expect(page.locator('nav')).toHaveScreenshot('navigation-scrolled.png', {
            maxDiffPixels: 50,
        });
    });

    test('project cards match baseline', async ({ page }) => {
        await page.goto('/');

        // Scroll to projects section
        await page.evaluate(() => {
            document.querySelector('#projects')?.scrollIntoView();
        });

        await page.waitForTimeout(1000);

        // Screenshot first project card
        const firstCard = page.locator('[class*="glass-effect"]').first();
        await expect(firstCard).toHaveScreenshot('project-card.png', {
            maxDiffPixels: 100,
        });
    });

    test('footer matches baseline', async ({ page }) => {
        await page.goto('/');

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        await expect(page.locator('footer')).toHaveScreenshot('footer.png', {
            maxDiffPixels: 50,
        });
    });

    test('mobile view matches baseline', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        await page.waitForTimeout(2000);

        await expect(page).toHaveScreenshot('mobile-homepage.png', {
            fullPage: true,
            maxDiffPixels: 300,
        });
    });

    test('tablet view matches baseline', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/');

        await page.waitForTimeout(2000);

        await expect(page).toHaveScreenshot('tablet-homepage.png', {
            fullPage: true,
            maxDiffPixels: 300,
        });
    });
});

test.describe('3D Scene Visual Tests', () => {
    test('3D hero object renders consistently', async ({ page }) => {
        await page.goto('/');

        // Wait longer for 3D scene
        await page.waitForTimeout(4000);

        // Take screenshot of the canvas area
        const canvas = page.locator('canvas').first();
        if (await canvas.isVisible()) {
            await expect(canvas).toHaveScreenshot('3d-hero-object.png', {
                maxDiffPixels: 500, // 3D rendering can have more variance
            });
        }
    });

    test('particle system renders consistently', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(4000);

        // Particles might have animation, so we allow more diff
        const canvas = page.locator('canvas').first();
        if (await canvas.isVisible()) {
            await expect(canvas).toHaveScreenshot('particle-system.png', {
                maxDiffPixels: 1000,
            });
        }
    });
});

test.describe('Hover State Visual Tests', () => {
    test('project card hover state', async ({ page }) => {
        await page.goto('/');

        await page.evaluate(() => {
            document.querySelector('#projects')?.scrollIntoView();
        });

        await page.waitForTimeout(1000);

        const firstCard = page.locator('[class*="glass-effect"]').first();
        await firstCard.hover();
        await page.waitForTimeout(500);

        await expect(firstCard).toHaveScreenshot('project-card-hover.png', {
            maxDiffPixels: 150,
        });
    });

    test('navigation link hover state', async ({ page }) => {
        await page.goto('/');

        const navLink = page.locator('nav a, nav button').first();
        await navLink.hover();
        await page.waitForTimeout(300);

        await expect(page.locator('nav')).toHaveScreenshot('nav-link-hover.png', {
            maxDiffPixels: 50,
        });
    });
});
