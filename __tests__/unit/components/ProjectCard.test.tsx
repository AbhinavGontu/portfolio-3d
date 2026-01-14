import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/ui/ProjectCard';

const mockProject = {
    title: 'Test Project',
    description: 'This is a test project description',
    tags: ['React', 'TypeScript', 'Next.js'],
    image: '/images/test.jpg',
    link: 'https://test.com',
    github: 'https://github.com/test',
    metrics: {
        users: '10K+',
        performance: 'Sub-100ms',
    },
};

describe('ProjectCard Component', () => {
    it('renders project title', () => {
        render(<ProjectCard {...mockProject} />);

        expect(screen.getByText('Test Project')).toBeInTheDocument();
    });

    it('renders project description', () => {
        render(<ProjectCard {...mockProject} />);

        expect(screen.getByText('This is a test project description')).toBeInTheDocument();
    });

    it('renders all tags', () => {
        render(<ProjectCard {...mockProject} />);

        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Next.js')).toBeInTheDocument();
    });

    it('renders only first 4 tags when more than 4 are provided', () => {
        const manyTags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6'];
        render(<ProjectCard {...mockProject} tags={manyTags} />);

        expect(screen.getByText('Tag1')).toBeInTheDocument();
        expect(screen.getByText('Tag4')).toBeInTheDocument();
        expect(screen.queryByText('Tag5')).not.toBeInTheDocument();
    });

    it('renders performance metrics', () => {
        render(<ProjectCard {...mockProject} />);

        expect(screen.getByText('10K+')).toBeInTheDocument();
        expect(screen.getByText('Sub-100ms')).toBeInTheDocument();
    });

    it('renders project and GitHub links', () => {
        render(<ProjectCard {...mockProject} />);

        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);

        const projectLink = links.find(link => link.textContent?.includes('View Project'));
        const githubLink = links.find(link => link.textContent?.includes('GitHub'));

        expect(projectLink).toHaveAttribute('href', 'https://test.com');
        expect(githubLink).toHaveAttribute('href', 'https://github.com/test');
    });

    it('displays first letter of title as fallback image', () => {
        render(<ProjectCard {...mockProject} />);

        expect(screen.getByText('T')).toBeInTheDocument(); // First letter of "Test Project"
    });

    it('renders without metrics gracefully', () => {
        const { description, ...projectWithoutMetrics } = mockProject;
        render(<ProjectCard {...projectWithoutMetrics} description={description} />);

        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.queryByText('users')).not.toBeInTheDocument();
    });
});
