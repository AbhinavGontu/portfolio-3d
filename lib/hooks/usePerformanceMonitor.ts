import { useEffect, useState } from "react";
import { PERFORMANCE_CONFIG } from "../utils/constants";

interface PerformanceMetrics {
    fps: number;
    shouldReduceQuality: boolean;
}

export function usePerformanceMonitor(): PerformanceMetrics {
    const [fps, setFps] = useState(60);
    const [shouldReduceQuality, setShouldReduceQuality] = useState(false);

    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId: number;

        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            const elapsed = currentTime - lastTime;

            // Update FPS every second
            if (elapsed >= 1000) {
                const currentFPS = Math.round((frameCount * 1000) / elapsed);
                setFps(currentFPS);

                // Reduce quality if FPS drops below 45
                setShouldReduceQuality(currentFPS < 45);

                frameCount = 0;
                lastTime = currentTime;
            }

            animationFrameId = requestAnimationFrame(measureFPS);
        };

        animationFrameId = requestAnimationFrame(measureFPS);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return { fps, shouldReduceQuality };
}
