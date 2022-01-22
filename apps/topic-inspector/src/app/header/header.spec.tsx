import { render } from '@testing-library/react';
import { Header } from './header';

describe('Inspect Topics', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Header />);
        expect(baseElement).toBeTruthy();
    });
});
