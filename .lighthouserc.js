module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:3000'],
            startServerCommand: 'npm run build && npm start',
            numberOfRuns: 3,
        },
        assert: {
            preset: 'lighthouse:recommended',
            assertions: {
                // Performance
                'categories:performance': ['error', { minScore: 0.9 }],
                'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
                'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['error', { maxNumericValue: 300 }],
                'speed-index': ['error', { maxNumericValue: 3000 }],

                // Accessibility
                'categories:accessibility': ['error', { minScore: 1.0 }],
                'color-contrast': 'error',
                'heading-order': 'warn',
                'image-alt': 'error',
                'label': 'error',

                // Best Practices
                'categories:best-practices': ['error', { minScore: 0.95 }],
                'errors-in-console': 'warn',
                'uses-http2': 'off',

                // SEO
                'categories:seo': ['error', { minScore: 1.0 }],
                'meta-description': 'error',
                'document-title': 'error',
                'link-text': 'error',

                // Progressive Web App (optional)
                'categories:pwa': 'off',

                // Resource optimization
                'uses-webp-images': 'warn',
                'modern-image-formats': 'warn',
                'unused-javascript': ['warn', { maxLength: 1 }],
                'uses-responsive-images': 'warn',

                // JavaScript bundles
                'bootup-time': ['error', { maxNumericValue: 2000 }],
                'mainthread-work-breakdown': ['error', { maxNumericValue: 3000 }],

                // Network
                'uses-long-cache-ttl': 'warn',
                'efficient-animated-content': 'warn',
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
