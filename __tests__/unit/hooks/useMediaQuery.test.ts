import { renderHook } from '@testing-library/react';
import { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from '@/lib/hooks/useMediaQuery';

describe('useMediaQuery Hook', () => {
    let matchMediaMock: jest.Mock;

    beforeEach(() => {
        matchMediaMock = jest.fn();
        window.matchMedia = matchMediaMock;
    });

    it('returns false when media query does not match', () => {
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(false);
    });

    it('returns true when media query matches', () => {
        matchMediaMock.mockReturnValue({
            matches: true,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });

        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

        expect(result.current).toBe(true);
    });

    it('cleans up event listeners on unmount', () => {
        const removeListenerMock = jest.fn();
        matchMediaMock.mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: removeListenerMock,
        });

        const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));
        unmount();

        expect(removeListenerMock).toHaveBeenCalled();
    });
});

describe('useIsMobile Hook', () => {
    beforeEach(() => {
        window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: query === '(max-width: 768px)',
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));
    });

    it('returns true on mobile viewports', () => {
        window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: query.includes('max-width: 768px'),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));

        const { result } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });
});

describe('useIsTablet Hook', () => {
    it('returns true on tablet viewports', () => {
        window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: query.includes('min-width: 769px') && query.includes('max-width: 1024px'),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));

        const { result } = renderHook(() => useIsTablet());
        expect(result.current).toBe(true);
    });
});

describe('useIsDesktop Hook', () => {
    it('returns true on desktop viewports', () => {
        window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: query.includes('min-width: 1025px'),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        }));

        const { result } = renderHook(() => useIsDesktop());
        expect(result.current).toBe(true);
    });
});
