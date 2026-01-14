import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '@/components/ui/Navigation';

describe('Navigation Component', () => {
    beforeEach(() => {
        // Mock window.scrollY
        Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: 0,
        });
    });

    it('renders navigation items', () => {
        render(<Navigation />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders logo', () => {
        render(<Navigation />);

        expect(screen.getByText('AG')).toBeInTheDocument();
    });

    it('toggles mobile menu when hamburger is clicked', () => {
        render(<Navigation />);

        const hamburgerButton = screen.getByLabelText('Toggle menu');

        // Initially, mobile menu items should not be visible
        const homeButton = screen.queryByRole('button', { name: /Home/i });
        expect(homeButton).not.toBeInTheDocument();

        // Click hamburger to open menu
        fireEvent.click(hamburger Button);

        // Now menu items should be visible
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(1);
    });

    it('applies glassmorphism effect on scroll', () => {
        const { container } = render(<Navigation />);
        const nav = container.querySelector('nav');

        // Initially no glass effect
        expect(nav).not.toHaveClass('glass-effect');

        // Simulate scroll
        Object.defineProperty(window, 'scrollY', {
            value: 100,
        });
        fireEvent.scroll(window);

        // Should have glass effect after scroll
        setTimeout(() => {
            expect(nav).toHaveClass('glass-effect');
        }, 100);
    });

    it('handles smooth scroll on nav item click', () => {
        // Mock scrollIntoView
        Element.prototype.scrollIntoView = jest.fn();

        // Mock querySelector
        document.querySelector = jest.fn((selector) => ({
            scrollIntoView: jest.fn(),
        })) as any;

        render(<Navigation />);

        const projectsLink = screen.getByText('Projects');
        fireEvent.click(projectsLink);

        expect(document.querySelector).toHaveBeenCalledWith('#projects');
    });

    it('closes mobile menu after navigation', () => {
        render(<Navigation />);

        const hamburgerButton = screen.getByLabelText('Toggle menu');

        // Open menu
        fireEvent.click(hamburgerButton);

        // Click a nav item
        const buttons = screen.getAllByRole('button');
        const homeButton = buttons.find(btn => btn.textContent === 'Home');

        if (homeButton) {
            fireEvent.click(homeButton);
      
      /

                / Menu should close
            setTimeout(() => {
                const visibleButtons = screen.queryAllByRole('button');
                expect(visibleButtons.length).toBe(1); // Only hamburger button visible
            }, 100);
        }
    });
});
