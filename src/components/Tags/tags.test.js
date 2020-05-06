import React from 'react';
import ReactDOM from 'react-dom';
import Tags from './Tags';

it('Renders the Tags component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Tags />, div);

    ReactDOM.unmountComponentAtNode(div);
});