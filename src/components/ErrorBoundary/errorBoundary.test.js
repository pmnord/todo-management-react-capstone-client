import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './ErrorBoundary';

it('Renders the ErrorBoundary component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ErrorBoundary />, div);

    ReactDOM.unmountComponentAtNode(div);
});