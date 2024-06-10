import { render, screen } from '@testing-library/react';
import Summary from '@/app/app/(main)/_components/summary';
import {GetTaskStatistics} from '../src/app/app/(main)/actions'

jest.mock('../src/app/app/(main)/actions', () => ({
    GetTaskStatistics: jest.fn(),
}));

// Helper function to resolve the async component
async function resolvedComponent(Component, props) {
    const ComponentResolved = await Component(props)
    return () => ComponentResolved
}

describe('dashboard', () => {
    test('renders summary with right data', async () => {

        const datas = {
            totalValue: 712628,
            avgValuePerMonth: 183414,
            avgValuePerHour: 1890567,
            totalReviewValue: 895251,
        }

        GetTaskStatistics.mockResolvedValueOnce(datas);

        // Resolve the Page component
        const PageResolved = await resolvedComponent(Summary);

        // Render the resolved component
        render(<PageResolved />);

        // Check if "Dashboard" text is present in the document
        const foundElements = [];
        for (const key in datas) {
            if (datas.hasOwnProperty(key)) {
                const value = `R$ ${datas[key]}`; // Adjust the text to include the prefix
                const elements = await screen.findAllByText((content, element) => {
                    return element.textContent.includes(value);
                });
                foundElements.push(...elements);
            }
        }
        

        foundElements.forEach(element => {
            expect(element).toBeInTheDocument();
        });

    });

    test('renders "No data available" summary with null data', async () => {

        const datas = null

        GetTaskStatistics.mockResolvedValueOnce(datas);

        // Resolve the Page component
        const PageResolved = await resolvedComponent(Summary);

        // Render the resolved component
        render(<PageResolved />);

        // Check if "Dashboard" text is present in the document
        expect(await screen.findByText('No data available')).toBeInTheDocument();

    });

    test('renders "0" on avery card summary with null/0 data data', async () => {

        const datas = {
            totalValue: null,
            avgValuePerMonth: null,
            avgValuePerHour: null,
            totalReviewValue: null,
        }

        GetTaskStatistics.mockResolvedValueOnce(datas);

        // Resolve the Page component
        const PageResolved = await resolvedComponent(Summary);

        // Render the resolved component
        render(<PageResolved />);

        const shouldShowText = `R$ 0`; 
        const foundElements = [];
        for (const key in datas) {
            if (datas.hasOwnProperty(key)) {
                const elements = await screen.findAllByText((content, element) => {
                    return element.textContent.includes(shouldShowText);
                });
                foundElements.push(...elements);
            }
        }
        

        foundElements.forEach(element => {
            expect(element).toBeInTheDocument();
        });

    });

    test('renders "No data available" summary on error', async () => {

        GetTaskStatistics.mockRejectedValueOnce(new Error('Failed to fetch'));

        // Resolve the Page component
        const PageResolved = await resolvedComponent(Summary);

        // Render the resolved component
        render(<PageResolved />);

        // Check if "Dashboard" text is present in the document
        expect(await screen.findByText('No data available')).toBeInTheDocument();

    });
});
