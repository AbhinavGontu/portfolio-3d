import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '@/lib/hooks/useScrollPosition';

describe('useScrollPosition Hook', () => {
    beforeEach(() => {
        // Reset scroll position
        Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: 0,
        });

        Object.defineProperty(document.documentElement, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: 2000,
        });

        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 1000,
        });
    });

    it('returns initial scroll position as 0', () => {
        const { result } = renderHook(() => useScrollPosition());

        expect(result.current.scrollY).toBe(0);
        expect(result.current.scrollProgress).toBe(0);
    });

    it('updates scroll position on window scroll', () => {
        const { result } = renderHook(() => useScrollPosition());

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 500 });
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.scrollY).toBe(500);
    });

    it('calculates scroll progress correctly', () => {
        const { result } = renderHook(() => useScrollPosition());

        // Scroll to middle (500px out of 1000px scrollable height)
        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 500 });
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.scrollProgress).toBe(0.5);
    });

    it('scroll progress is 1 when scrolled to bottom', () => {
        const { result } = renderHook(() => useScrollPosition());

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 1000 });
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current.scrollProgress).toBe(1);
    });

    it('cleans up event listener on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = renderHook(() => useScrollPosition());
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
});
