import { render } from '@testing-library/react';
import { InspectTopics } from './inspect-topics';

describe('Inspect Topics', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<InspectTopics />);
        expect(baseElement).toBeTruthy();
    });
});
