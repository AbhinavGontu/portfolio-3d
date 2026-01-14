/**
 * A/B Testing Experiments Configuration
 * 
 * Define experiments with variants and their weights.
 * Weights should sum to 1.0 for each experiment.
 */

export interface Experiment {
    name: string;
    variants: VariantConfig[];
}

export interface VariantConfig {
    id: string;
    name: string;
    weight: number;
}

export const experiments: Record<string, Experiment> = {
    heroCTA: {
        name: 'Hero CTA Button Text',
        variants: [
            { id: 'control', name: 'View Projects', weight: 0.34 },
            { id: 'variant-a', name: 'See My Work', weight: 0.33 },
            { id: 'variant-b', name: 'Explore Portfolio', weight: 0.33 },
        ],
    },

    colorScheme: {
        name: 'Primary Color Scheme',
        variants: [
            { id: 'control', name: 'Blue/Purple', weight: 0.5 },
            { id: 'variant-a', name: 'Green/Blue', weight: 0.5 },
        ],
    },

    projectLayout: {
        name: 'Project Card Layout',
        variants: [
            { id: 'control', name: 'Grid Layout', weight: 0.5 },
            { id: 'variant-a', name: 'List Layout', weight: 0.5 },
        ],
    },
};

/**
 * Get a variant for a given experiment based on user ID or random selection
 */
export function getVariant(experimentId: string, userId?: string): string {
    const experiment = experiments[experimentId];

    if (!experiment) {
        console.warn(`Experiment ${experimentId} not found`);
        return 'control';
    }

    // Use userId for consistent variant assignment
    if (userId) {
        const hash = hashString(userId + experimentId);
        const normalizedHash = hash / Number.MAX_SAFE_INTEGER;

        let cumulativeWeight = 0;
        for (const variant of experiment.variants) {
            cumulativeWeight += variant.weight;
            if (normalizedHash <= cumulativeWeight) {
                return variant.id;
            }
        }
    }

    // Random selection if no userId
    const random = Math.random();
    let cumulativeWeight = 0;

    for (const variant of experiment.variants) {
        cumulativeWeight += variant.weight;
        if (random <= cumulativeWeight) {
            return variant.id;
        }
    }

    return 'control';
}

/**
 * Simple string hash function for consistent variant assignment
 */
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
