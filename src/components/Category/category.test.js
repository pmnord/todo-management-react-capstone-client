import React from 'react';
import ReactDOM from 'react-dom';
import Category from './Category';

it('Renders the Category component', () => {
    const div = document.createElement('div');

    const mockTasks = [];

    ReactDOM.render(<Category tasks={mockTasks} />, div);

    ReactDOM.unmountComponentAtNode(div);
});