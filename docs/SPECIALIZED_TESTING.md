# Specialized Testing Documentation

Complete guide for visual regression, 3D performance, accessibility, and Lighthouse testing.

---

## Overview

This portfolio uses specialized testing tailored for 3D graphics and visual experiences:

1. **Visual Regression** - Detect visual changes
2. **3D Performance** - Monitor rendering performance
3. **Accessibility** - Ensure WCAG compliance
4. **Lighthouse CI** - Continuous performance monitoring
5. **Snapshot Tests** - Component structure validation

---

## Visual Regression Testing

### Purpose
Catch unintended visual changes in UI components and 3D scenes.

### Running Tests

\`\`\`bash
# Run all visual tests
npm run test:visual

# Update baseline screenshots
npm run test:visual -- --update-snapshots
\`\`\`

### What's Tested

- ✅ Hero section with 3D scene
- ✅ Navigation bar (normal and scrolled states)
- ✅ Project cards
- ✅ Footer
- ✅ Mobile/tablet responsive views
- ✅ 3D hero object rendering
- ✅ Particle system
- ✅ Hover states

### Baseline Screenshots

Located in `__tests__/visual/*.spec.ts-snapshots/`

**Diff Thresholds**:
- UI Components: 50-200 pixels
- 3D Scenes: 500-1000 pixels (more variance expected)
- Full page: 300 pixels

### When to Update Baselines

After intentional design changes:
\`\`\`bash
npm run test:visual -- --update-snapshots
\`\`\`

---

## 3D Performance Testing

### Purpose
Ensure 3D graphics maintain target frame rates and don't cause memory leaks.

### Running Tests

\`\`\`bash
# Run performance tests
npm run test:perf

# Run with specific browser
npx playwright test __tests__/performance --project=chromium
\`\`\`

### Metrics Monitored

#### Frame Rate (FPS)
- **Desktop Target**: 60fps (minimum 55fps)
- **Mobile Target**: 30fps (minimum 25fps)
- **Test Duration**: 3 seconds
- **Metric**: Average FPS and frame time

#### Memory Usage
- **Initial Load**: Tracked
- **After Interactions**: Monitored
- **Threshold**: <10MB increase
- **Checks**: No memory leaks

#### Core Web Vitals
- **LCP** (Largest Contentful Paint): <2.5s
- **CLS** (Cumulative Layout Shift): <0.1
- **Load Time**: <3s

#### Asset Loading
- **3D Models**: <2s per asset
- **Textures**: <2s per texture
- **Total Load**: Network idle check

### Performance Benchmarks

| Metric | Desktop | Mobile |
|--------|---------|--------|
| FPS | 60 (min 55) | 30 (min 25) |
| Frame Time | <17ms | <33ms |
| Page Load | <3s | <3s |
| LCP | <2.5s | <2.5s |
| CLS | <0.1 | <0.1 |

---

## Accessibility Testing

### Purpose
Ensure WCAG 2.1 AA compliance and keyboard accessibility.

### Running Tests

\`\`\`bash
# Run accessibility tests
npm run test:a11y

# Generate accessibility report
npx playwright test __tests__/accessibility --reporter=html
\`\`\`

### What's Tested

#### WCAG Compliance
- ✅ Color contrast (WCAG AA)
- ✅ Heading hierarchy
- ✅ ARIA attributes
- ✅ Form labels
- ✅ Image alt text
- ✅ Semantic HTML

#### Keyboard Navigation
- ✅ Tab order
- ✅ Focus indicators
- ✅ Skip links
- ✅ Interactive elements

#### Reduced Motion
- ✅ `prefers-reduced-motion` support
- ✅ Animation disabling
- ✅ Alternative experiences

### Axe-core Rules

Tests run with these tag sets:
- `wcag2a` - WCAG 2.0 Level A
- `wcag2aa` - WCAG 2.0 Level AA
- `best-practice` - Industry best practices

### Common Issues & Fixes

**Color Contrast**:
- Ensure text has 4.5:1 ratio (normal text)
- Ensure text has 3:1 ratio (large text ≥18pt)

**Alt Text**:
- All `<img>` tags need descriptive alt
- Decorative images use `alt=""`

**ARIA**:
- Use semantic HTML first
- Only add ARIA when necessary
- Validate ARIA attributes

---

## Lighthouse CI

### Purpose
Continuous monitoring of performance, accessibility, SEO, and best practices.

### Running Tests

\`\`\`bash
# Run Lighthouse CI
npm run test:lighthouse

# Run with custom URL
lhci autorun --url=http://localhost:3000
\`\`\`

### Configuration

Located in `.lighthouserc.js`

### Assertions

#### Performance (Score ≥90)
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Total Blocking Time: <300ms
- Speed Index: <3s

#### Accessibility (Score = 100)
- Color contrast: ✅ Required
- Image alt: ✅ Required
- Form labels: ✅ Required

#### SEO (Score = 100)
- Meta description: ✅ Required
- Document title: ✅ Required
- Link text: ✅ Descriptive

#### Best Practices (Score ≥95)
- HTTPS: ✅ Required
- No console errors: ⚠️ Warning
- Modern image formats: ⚠️ Warning

### CI Integration

Lighthouse runs automatically in GitHub Actions on every PR.

View reports at:
- GitHub Actions > Artifacts > lighthouse-report

---

## Snapshot Testing

### Purpose
Detect unintended changes to component structure.

### Running Tests

\`\`\`bash
# Run snapshot tests
npm test -- __tests__/snapshots

# Update snapshots
npm test -- __tests__/snapshots -u
\`\`\`

### What's Tested

- Component DOM structure
- Props rendering
- Conditional rendering
- Edge cases

### When to Update Snapshots

After intentional component changes:
\`\`\`bash
npm test -- -u
\`\`\`

**Review changes carefully** before updating!

---

## Complete Test Suite

Run all specialized tests:

\`\`\`bash
# Run everything
npm run test:all

# Or individually
npm run test:visual   # Visual regression
npm run test:perf     # 3D performance
npm run test:a11y     # Accessibility
npm run test:lighthouse # Lighthouse CI
\`\`\`

---

## CI/CD Integration

### GitHub Actions Workflow

Updated `.github/workflows/test.yml` includes:

1. **visual-tests** - Visual regression checks
2. **performance-tests** - 3D rendering performance
3. **a11y-tests** - Accessibility validation
4. **lighthouse** - Performance budgets

### PR Checks

Every PR runs:
- ✅ Unit tests
- ✅ E2E tests
- ✅ Visual regression
- ✅ Accessibility scan
- ✅ Performance benchmarks
- ✅ Lighthouse audit

Merge blocked if tests fail.

---

## Best Practices

### Visual Regression
✅ Review diffs before updating baselines  
✅ Use appropriate threshold for content type  
✅ Test on multiple viewports  
✅ Include hover/focus states  

### 3D Performance
✅ Test on various devices  
✅ Monitor memory over time  
✅ Check console for WebGL errors  
✅ Validate FPS under load  

### Accessibility
✅ Test with keyboard only  
✅ Run screen reader tests manually  
✅ Check reduced motion  
✅ Validate color contrast  

### Lighthouse
✅ Run on production build  
✅ Test multiple runs (variance)  
✅ Monitor trends over time  
✅ Set realistic budgets  

---

## Debugging Failed Tests

### Visual Regression Failures

1. View diff image in test report
2. Determine if change is intentional
3. If intentional: `npm run test:visual -- --update-snapshots`
4. If bug: fix code and rerun

### Performance Failures

1. Check FPS metrics in test output
2. Profile with Chrome DevTools
3. Reduce particle count if needed
4. Optimize 3D models/textures

### Accessibility Failures

1. Review axe violations in report
2. Fix specific WCAG issues
3. Verify with manual testing
4. Rerun: `npm run test:a11y`

### Lighthouse Failures

1. Check which metric failed
2. Use Chrome Lighthouse locally
3. Optimize as needed
4. Rerun: `npm run test:lighthouse`

---

## Continuous Monitoring

### Production Monitoring

After deployment, monitor:
- Real User Metrics (RUM)
- Error rates
- FPS degradation
- Accessibility reports

### Tools
- Vercel Analytics (built-in)
- Google Analytics 4
- Sentry (error tracking)
- Lighthouse CI (continuous)

---

**Last Updated**: January 2026  
**Version**: 2.0.0 (Specialized Testing)
