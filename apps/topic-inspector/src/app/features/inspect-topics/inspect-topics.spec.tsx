import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { GlobalStore } from '../../_store/store';

import { InspectTopics } from './inspect-topics';

describe('Inspect Topics', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <Provider store={GlobalStore}>
                <InspectTopics />
            </Provider>
        );
        expect(baseElement).toBeTruthy();
    });
});
