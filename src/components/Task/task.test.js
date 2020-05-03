import React from 'react';
import ReactDOM from 'react-dom';
import Task from './Task';

it('Renders the Task component', () => {
    const div = React.createElement('div');

    ReactDOM.render(<Task />, div);

    ReactDOM.unmountComponentAtNode(div);
});