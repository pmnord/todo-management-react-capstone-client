import React from 'react';
import ReactDOM from 'react-dom';
import Project from './Project';

it('Renders the Project component', () => {
    const div = document.createElement('div');
    
    const mockRoute = {
        match: {
            params: {
                project_id: 'foo'
            }
        }
    }

    ReactDOM.render(<Project route={mockRoute} />, div);

    ReactDOM.unmountComponentAtNode(div);
});