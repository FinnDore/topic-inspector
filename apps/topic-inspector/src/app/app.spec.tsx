import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { GlobalStore } from './_store/store';

global.ResizeObserver = require('resize-observer-polyfill');

describe('App', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={GlobalStore}>
                <BrowserRouter>
                    <div>
                        <App />
                    </div>
                </BrowserRouter>
            </Provider>
        );

        expect(baseElement).toBeTruthy();
    });
});
