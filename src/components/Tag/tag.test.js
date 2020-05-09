import React from 'react';
import ReactDOM from 'react-dom';
import Tag from './Tag';

it('Renders the Tag component', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Tag />, div);

    ReactDOM.unmountComponentAtNode(div);
});