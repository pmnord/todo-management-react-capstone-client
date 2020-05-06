import React from 'react';
import ReactDOM from 'react-dom';
import AddButton from './AddButton';

it('Renders the AddButton component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<AddButton />, div);

    ReactDOM.unmountComponentAtNode(div);
});