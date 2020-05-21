import React from 'react';
import ReactDOM from 'react-dom';
import DeleteButton from './DeleteButton.js';

it('Renders the DeleteButton component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<DeleteButton />, div);

    ReactDOM.unmountComponentAtNode(div);
});