import { render } from '@testing-library/react';

import TreeMap from './tree-map';

describe('TreeMap', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<TreeMap />);
        expect(baseElement).toBeTruthy();
    });
});
