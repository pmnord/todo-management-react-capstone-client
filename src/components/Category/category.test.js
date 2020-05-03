import React from 'react';
import ReactDOM from 'react-dom';
import Category from './Category';

it('Renders the Category component', () => {
    const div = React.createElement('div');

    ReactDOM.render(<Category />, div);

    ReactDOM.unmountComponentAtNode(div);
});