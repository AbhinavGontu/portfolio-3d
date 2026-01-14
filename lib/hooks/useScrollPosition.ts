import { useEffect, useState } from "react";

/**
 * Custom Hook: useScrollPosition
 * 
 * Tracks the user's scroll position and calculates how far they've scrolled
 * through the page as a percentage (0-1). Used for scroll-triggered animations
 * and parallax effects throughout the portfolio.
 * 
 * Returns:
 * - scrollY: Vertical scroll distance in pixels from top of page
 * - scrollProgress: Normalized progress from 0 (top) to 1 (bottom)
 * 
 * Performance optimization: Uses passive event listeners for better scroll
 * performance (doesn't block scrolling while JavaScript executes).
 */
export function useScrollPosition() {
    /**
     * State: scrollY
     * Current vertical scroll position in pixels
     * Example values: 0 (top of page), 500 (scrolled 500px down), etc.
     */
    const [scrollY, setScrollY] = useState(0);

    /**
     * State: scrollProgress
     * Normalized scroll progress from 0 to 1
     * - 0 = at top of page
     * - 0.5 = scrolled halfway through page
     * - 1 = scrolled to bottom
     * 
     * Used for animations that should progress based on scroll position
     * (e.g., fade in elements as user scrolls down)
     */
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        /**
         * Scroll Event Handler
         * 
         * Called whenever the user scrolls, this function:
         * 1. Gets current scroll position (window.scrollY)
         * 2. Calculates total scrollable height
         * 3. Computes progress as a percentage
         * 4. Updates React state with new values
         * 
         * Why we calculate scrollHeight this way:
         * - document.documentElement.scrollHeight = total page height
         * - window.innerHeight = visible viewport height
         * - Subtracting gives us scrollable distance
         * - Example: 2000px page height - 800px viewport = 1200px scrollable
         * 
         * Progress calculation:
         * - If scrollable height is 1200px and user scrolled 600px:
         *   progress = 600 / 1200 = 0.5 (50% through page)
         * - If scrollable height is 0 (page shorter than viewport):
         *   progress = 0 (prevents division by zero, no scrolling needed)
         */
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? currentScrollY / scrollHeight : 0;

            setScrollY(currentScrollY);
            setScrollProgress(progress);
        };

        /**
         * Event Listener Registration
         * 
         * { passive: true } is a performance optimization:
         * - Tells browser this listener won't call preventDefault()
         * - Allows browser to scroll immediately without waiting for JS
         * - Critical for smooth 60fps scrolling on slower devices
         * 
         * Without passive:true, browser must wait for our code to execute
         * before scrolling, which can cause jank/lag.
         */
        window.addEventListener("scroll", handleScroll, { passive: true });

        /**
         * Initial value calculation
         * Call handleScroll immediately to set initial state based on
         * current scroll position (useful if page loads already scrolled,
         * e.g., from browser back button or anchor link).
         */
        handleScroll();

        /**
         * Cleanup Function
         * 
         * Removes the scroll event listener when component unmounts.
         * Critical for preventing memory leaks - without this, the event
         * listener would continue firing even after the component is destroyed,
         * potentially causing errors or memory buildup.
         * 
         * This cleanup runs when:
         * - Component unmounts (user navigates away)
         * - Effect dependencies change (doesn't happen here, empty deps array)
         */
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Empty dependency array = run once on mount, cleanup on unmount

    return { scrollY, scrollProgress };
}
