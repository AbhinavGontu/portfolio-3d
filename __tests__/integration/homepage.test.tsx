import { render, screen, within } from '@testing-library/react';
import HomePage from '@/app/page';
import projects from '@/lib/data/projects.json';
import experience from '@/lib/data/experience.json';

// Mock dynamic import for 3D Scene
jest.mock('next/dynamic', () => ({
    __esModule: true,
    default: (...args: any[]) => {
        const dynamicModule = jest.requireActual('next/dynamic');
        const dynamicActualComp = dynamicModule.default;
        const RequiredComponent = dynamicActualComp(args[0]);
        RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render.preload();
        return RequiredComponent;
    },
}));

// Mock 3D components
jest.mock('@/components/3d/HeroObject', () => ({
    HeroObject: () => <div data-testid="hero-object">3D Hero</div>,
}));

jest.mock('@/components/3d/ParticleSystem', () => ({
    ParticleSystem: () => <div data-testid="particle-system">Particles</div>,
}));

jest.mock('@/components/3d/FloatingElements', () => ({
    FloatingElements: () => <div data-testid="floating-elements">Floating</div>,
}));

jest.mock('@/components/3d/Scene', () => ({
    Scene: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="3d-scene">{children}</div>
    ),
}));

describe('HomePage Integration', () => {
    it('renders all main sections', () => {
        render(<HomePage />);

        // Hero section
        expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
        expect(screen.getByText(/Abhinav Gontu/i)).toBeInTheDocument();

        // Experience section
        expect(screen.getByText(/Experience/i)).toBeInTheDocument();

        // Projects section
        expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();

        // Contact section
        expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
    });

    it('renders all projects from data', () => {
        render(<HomePage />);

        projects.forEach((project) => {
            expect(screen.getByText(project.title)).toBeInTheDocument();
        });
    });

    it('renders experience timeline', () => {
        render(<HomePage />);

        experience.forEach((exp) => {
            expect(screen.getByText(exp.company)).toBeInTheDocument();
            expect(screen.getByText(exp.position)).toBeInTheDocument();
        });
    });

    it('renders CTA buttons in hero section', () => {
        render(<HomePage />);

        expect(screen.getByText('View Projects')).toBeInTheDocument();
        expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    });

    it('renders contact links', () => {
        render(<HomePage />);

        const emailLinks = screen.getAllByText('Email Me');
        expect(emailLinks.length).toBeGreaterThan(0);

        const linkedinLinks = screen.getAllByText(/LinkedIn/i);
        expect(linkedinLinks.length).toBeGreaterThan(0);
    });

    it('initializes 3D scene components', () => {
        render(<HomePage />);

        // Check that 3D scene is rendered
        expect(screen.getByTestId('3d-scene')).toBeInTheDocument();
    });
});
