import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { GlobalStore } from '../../../_store/store';

import { JsonInput } from './json-input';

describe('JsonInput', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={GlobalStore}>
                <JsonInput />
            </Provider>
        );
        expect(baseElement).toBeTruthy();
    });
});
