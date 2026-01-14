# Testing Guide

Comprehensive testing documentation for the 3D Portfolio Website covering unit tests, integration tests, E2E tests, and A/B testing.

---

## Overview

The project uses a multi-layered testing approach:
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: React Testing Library
- **E2E Tests**: Playwright
- **A/B Tests**: Custom implementation
- **CI/CD**: GitHub Actions

---

## Running Tests

### Unit & Integration Tests

\`\`\`bash
# Run all tests
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# With coverage report
npm run test:coverage

# Run specific test file
npm test -- Navigation.test.tsx
\`\`\`

### E2E Tests

\`\`\`bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (debugging)
npm run test:e2e:ui

# Run specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test homepage.spec.ts
\`\`\`

---

## Test Structure

\`\`\`
__tests__/
├── unit/                    # Component & hook unit tests
│   ├── components/
│   │   ├── Navigation.test.tsx
│   │   ├── ProjectCard.test.tsx
│   │   ├── Timeline.test.tsx
│   │   └── Footer.test.tsx
│   └── hooks/
│       ├── useScrollPosition.test.ts
│       ├── useMediaQuery.test.ts
│       └── usePerformanceMonitor.test.ts
│
├── integration/             # Integration tests
│   └── homepage.test.tsx
│
└── e2e/                     # End-to-end tests
    ├── homepage.spec.ts
    ├── mobile.spec.ts
    └── performance.spec.ts
\`\`\`

---

## Writing Tests

### Unit Test Example

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

### E2E Test Example

\`\`\`typescript
import { test, expect } from '@playwright/test';

test('user can navigate to projects', async ({ page }) => {
  await page.goto('/');
  await page.click('text=View Projects');
  await expect(page).toHaveURL(/#projects/);
});
\`\`\`

---

## A/B Testing

### Setup

The A/B testing framework is located in `lib/ab-testing/`.

**Available Experiments**:
- `heroCTA` - Hero CTA button text variations
- `colorScheme` - Primary color scheme variations
- `projectLayout` - Project card layout variations

### Usage

\`\`\`typescript
import { useExperiment, trackConversion } from '@/lib/ab-testing/useExperiment';

export function HeroSection() {
  const ctaVariant = useExperiment('heroCTA');
  
  const ctaText = {
    control: 'View Projects',
    'variant-a': 'See My Work',
    'variant-b': 'Explore Portfolio',
  }[ctaVariant];
  
  const handleClick = () => {
    trackConversion('heroCTA', 'click');
  };
  
  return <button onClick={handleClick}>{ctaText}</button>;
}
\`\`\`

### Tracking

Conversions are tracked via Google Analytics (if configured):
- `experiment_exposure` - When variant is shown
- `experiment_conversion` - When user converts (click, scroll, etc.)

---

## Coverage Reports

### Viewing Reports

After running `npm run test:coverage`:

\`\`\`bash
# Open coverage report in browser
open coverage/lcov-report/index.html
\`\`\`

### Coverage Thresholds

Configured in `jest.config.ts`:
- Branches: 70%
- Functions: 75%
- Lines: 80%
- Statements: 80%

---

## CI/CD Integration

### GitHub Actions Workflow

Located at `.github/workflows/test.yml`

**Triggers**:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

**Jobs**:
1. **unit-tests** - Runs Jest tests with coverage
2. **e2e-tests** - Runs Playwright E2E tests
3. **build-test** - Verifies production build
4. **lint** - Runs ESLint and TypeScript checks

### Viewing Results

- Check **Actions** tab in GitHub repository
- View coverage reports in Codecov (if configured)
- Download Playwright reports from artifacts

---

## Debugging Tests

### Jest Tests

\`\`\`bash
# Run in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Then open chrome://inspect in Chrome
\`\`\`

### Playwright Tests

\`\`\`bash
# Run with headed mode (see browser)
npx playwright test --headed

# Run with debug mode
npx playwright test --debug

# Run with UI mode
npm run test:e2e:ui
\`\`\`

---

## Best Practices

### Unit Tests
✅ Test behavior, not implementation  
✅ Use descriptive test names  
✅ Keep tests isolated (no shared state)  
✅ Mock external dependencies  
✅ Aim for >80% coverage  

### E2E Tests
✅ Test critical user journeys  
✅ Use data-testid for stable selectors  
✅ Wait for elements (avoid fixed timeouts)  
✅ Run cross-browser tests  
✅ Keep tests fast (<5min total)  

### A/B Tests
✅ Define clear success metrics  
✅ Run tests for statistically significant time  
✅ Document variant differences  
✅ Track both exposures and conversions  
✅ Archive completed experiments  

---

## Common Issues

### Issue: Tests timing out

**Solution**: Increase timeout in jest.config.ts or playwright.config.ts

\`\`\`typescript
// jest.config.ts
testTimeout: 10000 // 10 seconds

// playwright.config.ts
timeout: 30000 // 30 seconds
\`\`\`

### Issue: Flaky E2E tests

**Solution**: Use proper waits instead of fixed timeouts

\`\`\`typescript
// ❌ Bad
await page.waitForTimeout(1000);

// ✅ Good
await page.waitForSelector('text=Projects');
\`\`\`

### Issue: Mock not working

**Solution**: Ensure mock is defined before component import

\`\`\`typescript
// ✅ Correct order
jest.mock('@/components/MyComponent');
import { MyComponent } from '@/components/MyComponent';
\`\`\`

---

## Performance Testing

### Lighthouse CI

Add to `.github/workflows/test.yml`:

\`\`\`yaml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
\`\`\`

### Bundle Size Monitoring

Already included in CI workflow - fails if bundle > 300KB.

---

## Next Steps

1. **Increase Coverage**: Add more unit tests for uncovered components
2. **Add Visual Regression**: Use Playwright screenshots for visual diffs
3. **Performance Budgets**: Set stricter limits in CI
4. **A/B Analysis**: Set up automated reporting dashboard

---

Last Updated: January 2026
