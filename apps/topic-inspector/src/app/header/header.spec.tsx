import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { GlobalStore } from '../_store/store';
import { Header } from './header';

describe('Inspect Topics', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={GlobalStore}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </Provider>
        );
        expect(baseElement).toBeTruthy();
    });
});
