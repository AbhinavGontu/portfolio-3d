import { test, expect } from '@playwright/test';

test.describe('3D Rendering Performance Tests', () => {
    test('3D scene maintains target FPS on desktop', async ({ page }) => {
        await page.goto('/');

        // Wait for 3D scene to initialize
        await page.waitForTimeout(2000);

        // Measure FPS over 3 seconds
        const performanceMetrics = await page.evaluate(() => {
            return new Promise<{ fps: number; avgFrameTime: number }>((resolve) => {
                const frameTimes: number[] = [];
                let frameCount = 0;
                const startTime = performance.now();
                let lastFrameTime = startTime;

                function measureFrame(currentTime: number) {
                    const frameTime = currentTime - lastFrameTime;
                    frameTimes.push(frameTime);
                    frameCount++;
                    lastFrameTime = currentTime;

                    const elapsed = currentTime - startTime;

                    if (elapsed > 3000) {
                        const fps = (frameCount / elapsed) * 1000;
                        const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
                        resolve({ fps, avgFrameTime });
                    } else {
                        requestAnimationFrame(measureFrame);
                    }
                }

                requestAnimationFrame(measureFrame);
            });
        });

        // Desktop should maintain at least 55fps (allowing 5fps margin)
        expect(performanceMetrics.fps).toBeGreaterThan(55);

        // Average frame time should be under 17ms (60fps = 16.67ms per frame)
        expect(performanceMetrics.avgFrameTime).toBeLessThan(18);
    });

    test('3D scene loads without memory leaks', async ({ page }) => {
        await page.goto('/');

        // Wait for initial load
        await page.waitForTimeout(2000);

        // Get initial memory usage
        const initialMemory = await page.evaluate(() => {
            if ('memory' in performance) {
                return (performance as any).memory.usedJSHeapSize;
            }
            return 0;
        });

        // Trigger some interactions (scrolling, animations)
        await page.evaluate(() => {
            window.scrollTo(0, 500);
            window.scrollTo(0, 1000);
            window.scrollTo(0, 0);
        });

        await page.waitForTimeout(2000);

        // Get memory after interactions
        const finalMemory = await page.evaluate(() => {
            if ('memory' in performance) {
                return (performance as any).memory.usedJSHeapSize;
            }
            return 0;
        });

        // Memory should not increase by more than 10MB
        if (initialMemory > 0) {
            const memoryIncrease = (finalMemory - initialMemory) / (1024 * 1024); // Convert to MB
            expect(memoryIncrease).toBeLessThan(10);
        }
    });

    test('page loads within performance budget', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/');

        // Wait for main content to be visible
        await page.waitForSelector('h1');

        const loadTime = Date.now() - startTime;

        // Should load in under 3 seconds
        expect(loadTime).toBeLessThan(3000);
    });

    test('3D textures and assets load efficiently', async ({ page }) => {
        const resourceTimings: any[] = [];

        page.on('response', async (response) => {
            const url = response.url();
            if (url.includes('.jpg') || url.includes('.png') || url.includes('.glb') || url.includes('.gltf')) {
                const timing = response.timing();
                resourceTimings.push({
                    url,
                    duration: timing.responseEnd,
                });
            }
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check that assets load reasonably fast
        resourceTimings.forEach(timing => {
            expect(timing.duration).toBeLessThan(2000); // Under 2 seconds per asset
        });
    });

    test('mobile viewport maintains acceptable FPS', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        await page.goto('/');
        await page.waitForTimeout(2000);

        const mobileMetrics = await page.evaluate(() => {
            return new Promise<{ fps: number }>((resolve) => {
                let frameCount = 0;
                const startTime = performance.now();

                function measureFrame() {
                    frameCount++;
                    const elapsed = performance.now() - startTime;

                    if (elapsed > 3000) {
                        const fps = (frameCount / elapsed) * 1000;
                        resolve({ fps });
                    } else {
                        requestAnimationFrame(measureFrame);
                    }
                }

                requestAnimationFrame(measureFrame);
            });
        });

        // Mobile should maintain at least 25fps (target is 30fps with 5fps margin)
        expect(mobileMetrics.fps).toBeGreaterThan(25);
    });

    test('no console errors during 3D rendering', async ({ page }) => {
        const consoleErrors: string[] = [];

        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        await page.goto('/');
        await page.waitForTimeout(3000);

        // Filter out known harmless errors
        const criticalErrors = consoleErrors.filter(err =>
            !err.includes('favicon') &&
            !err.includes('chrome-extension')
        );

        expect(criticalErrors).toHaveLength(0);
    });
});

test.describe('Core Web Vitals', () => {
    test('LCP is under 2.5 seconds', async ({ page }) => {
        await page.goto('/');

        const lcp = await page.evaluate(() => {
            return new Promise<number>((resolve) => {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    resolve(lastEntry.startTime);
                }).observe({ type: 'largest-contentful-paint', buffered: true });

                // Timeout after 5 seconds
                setTimeout(() => resolve(5000), 5000);
            });
        });

        expect(lcp).toBeLessThan(2500);
    });

    test('CLS is acceptable', async ({ page }) => {
        await page.goto('/');

        // Scroll to trigger any layout shifts
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight / 2);
        });

        await page.waitForTimeout(1000);

        const cls = await page.evaluate(() => {
            return new Promise<number>((resolve) => {
                let clsValue = 0;

                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!(entry as any).hadRecentInput) {
                            clsValue += (entry as any).value;
                        }
                    }
                    resolve(clsValue);
                }).observe({ type: 'layout-shift', buffered: true });

                setTimeout(() => resolve(clsValue), 2000);
            });
        });

        // CLS should be under 0.1
        expect(cls).toBeLessThan(0.1);
    });
});
