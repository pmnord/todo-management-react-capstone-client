import React from 'react';
import ReactDOM from 'react-dom';
import ProjectToolbar from './ProjectToolbar';

it('Renders the ProjectToolbar component', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ProjectToolbar />, div);

  ReactDOM.unmountComponentAtNode(div);
});
