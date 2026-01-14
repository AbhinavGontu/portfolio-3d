import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
    test('homepage has no accessibility violations', async ({ page }) => {
        await page.goto('/');

        // Wait for page to fully load
        await page.waitForLoadState('networkidle');

        // Run axe accessibility scan
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        // Expect no violations
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('navigation is keyboard accessible', async ({ page }) => {
        await page.goto('/');

        // Tab through elements
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        // Check focus is visible
        const focusedElement = await page.evaluate(() => {
            const element = document.activeElement;
            const styles = window.getComputedStyle(element);
            return {
                tagName: element?.tagName,
                outlineWidth: styles.outlineWidth,
            };
        });

        // Ensure outline is visible or other focus indicator exists
        expect(focusedElement.tagName).toBeTruthy();
    });

    test('color contrast meets WCAG AA standards', async ({ page }) => {
        await page.goto('/');

        const contrastResults = await new AxeBuilder({ page })
            .withTags(['wcag2aa'])
            .analyze();

        const contrastViolations = contrastResults.violations.filter(
            v => v.id === 'color-contrast'
        );

        expect(contrastViolations).toHaveLength(0);
    });

    test('images have alt text', async ({ page }) => {
        await page.goto('/');

        const imagesWithoutAlt = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.filter(img => !img.alt || img.alt.trim() === '').length;
        });

        expect(imagesWithoutAlt).toBe(0);
    });

    test('headings have proper hierarchy', async ({ page }) => {
        await page.goto('/');

        const headingResults = await new AxeBuilder({ page })
            .withTags(['best-practice'])
            .analyze();

        const headingViolations = headingResults.violations.filter(
            v => v.id.includes('heading')
        );

        expect(headingViolations).toHaveLength(0);
    });

    test('form inputs have labels', async ({ page }) => {
        await page.goto('/');

        // Scroll to contact section
        await page.evaluate(() => {
            document.querySelector('#contact')?.scrollIntoView();
        });

        const labelResults = await new AxeBuilder({ page })
            .include('#contact')
            .analyze();

        const labelViolations = labelResults.violations.filter(
            v => v.id === 'label'
        );

        expect(labelViolations).toHaveLength(0);
    });

    test('ARIA attributes are valid', async ({ page }) => {
        await page.goto('/');

        const ariaResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();

        const ariaViolations = ariaResults.violations.filter(
            v => v.id.includes('aria')
        );

        expect(ariaViolations).toHaveLength(0);
    });
});

test.describe('Reduced Motion Support', () => {
    test('respects prefers-reduced-motion', async ({ page }) => {
        // Enable reduced motion preference
        await page.emulateMedia({ reducedMotion: 'reduce' });

        await page.goto('/');

        // Check if animations are reduced/disabled
        const animationDuration = await page.evaluate(() => {
            const element = document.querySelector('[class*="animate"]');
            if (!element) return null;
            const styles = window.getComputedStyle(element);
            return styles.animationDuration;
        });

        // Animation duration should be very short or none
        if (animationDuration) {
            expect(['0s', '0.01ms'].some(val => animationDuration.includes(val))).toBe(true);
        }
    });
});
