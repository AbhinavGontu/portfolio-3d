import { render } from '@testing-library/react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Timeline } from '@/components/ui/Timeline';
import { Footer } from '@/components/ui/Footer';

const mockProject = {
    title: 'Test Project',
    description: 'Test description',
    tags: ['React', 'TypeScript'],
    image: '/test.jpg',
    link: 'https://test.com',
    github: 'https://github.com/test',
    metrics: {
        users: '10K+',
        performance: 'Fast',
    },
};

const mockExperience = [
    {
        id: 'test',
        company: 'Test Company',
        position: 'Engineer',
        location: 'Remote',
        period: '2023 - Present',
        highlights: ['Achievement 1', 'Achievement 2'],
    },
];

describe('Component Snapshots', () => {
    it('ProjectCard matches snapshot', () => {
        const { container } = render(<ProjectCard {...mockProject} />);
        expect(container).toMatchSnapshot();
    });

    it('ProjectCard without metrics matches snapshot', () => {
        const { metrics, ...projectWithoutMetrics } = mockProject;
        const { container } = render(<ProjectCard {...projectWithoutMetrics} />);
        expect(container).toMatchSnapshot();
    });

    it('Timeline matches snapshot', () => {
        const { container } = render(<Timeline items={mockExperience} />);
        expect(container).toMatchSnapshot();
    });

    it('Footer matches snapshot', () => {
        const { container } = render(<Footer />);
        expect(container).toMatchSnapshot();
    });
});

describe('Conditional Rendering Snapshots', () => {
    it('ProjectCard with many tags renders correctly', () => {
        const projectWithManyTags = {
            ...mockProject,
            tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6'],
        };

        const { container } = render(<ProjectCard {...projectWithManyTags} />);
        expect(container).toMatchSnapshot();
    });

    it('Timeline with multiple items renders correctly', () => {
        const multipleExperience = [
            ...mockExperience,
            {
                id: 'test2',
                company: 'Another Company',
                position: 'Senior Engineer',
                location: 'New York',
                period: '2021 - 2023',
                highlights: ['Achievement A', 'Achievement B', 'Achievement C'],
            },
        ];

        const { container } = render(<Timeline items={multipleExperience} />);
        expect(container).toMatchSnapshot();
    });
});
