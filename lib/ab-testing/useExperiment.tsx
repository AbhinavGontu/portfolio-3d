"use client";

import { useState, useEffect } from 'react';
import { getVariant } from './experiments';

/**
 * Hook to get the variant for an A/B test experiment
 * 
 * @param experimentId - The ID of the experiment
 * @returns The variant ID assigned to this user
 */
export function useExperiment(experimentId: string): string {
    const [variant, setVariant] = useState<string>('control');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        // Get or create user ID from localStorage
        let storedUserId = localStorage.getItem('ab_user_id');

        if (!storedUserId) {
            storedUserId = generateUserId();
            localStorage.setItem('ab_user_id', storedUserId);
        }

        setUserId(storedUserId);

        // Get variant for this experiment
        const assignedVariant = getVariant(experimentId, storedUserId);
        setVariant(assignedVariant);

        // Track experiment exposure
        trackExperimentExposure(experimentId, assignedVariant);
    }, [experimentId]);

    return variant;
}

/**
 * Generate a unique user ID
 */
function generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Track when a user is exposed to an experiment variant
 */
function trackExperimentExposure(experimentId: string, variant: string) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[A/B Test] ${experimentId}: ${variant}`);
    }

    // In production, send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'experiment_exposure', {
            experiment_id: experimentId,
            variant_id: variant,
        });
    }
}

/**
 * Track conversion for an A/B test
 */
export function trackConversion(experimentId: string, conversionType: string = 'click') {
    const userId = localStorage.getItem('ab_user_id');
    const variant = getVariant(experimentId, userId || undefined);

    if (process.env.NODE_ENV === 'development') {
        console.log(`[A/B Test Conversion] ${experimentId}: ${variant} - ${conversionType}`);
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'experiment_conversion', {
            experiment_id: experimentId,
            variant_id: variant,
            conversion_type: conversionType,
        });
    }
}
