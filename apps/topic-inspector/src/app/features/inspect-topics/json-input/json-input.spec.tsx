import { render } from '@testing-library/react';

import JsonInput from './json-input';

describe('JsonInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<JsonInput />);
        expect(baseElement).toBeTruthy();
    });
});
