import React from 'react';
import ReactDOM from 'react-dom';
import Project from './Project';

it('Renders the Project component', () => {
    const div = React.createElement('div');

    ReactDOM.render(<Project />, div);

    ReactDOM.unmountComponentAtNode(div);
});