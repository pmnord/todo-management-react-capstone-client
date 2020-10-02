import React from 'react';
import ReactDOM from 'react-dom';
import ProjectHeader from './ProjectHeader';

it('Renders the ProjectHeader component', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ProjectHeader />, div);

  ReactDOM.unmountComponentAtNode(div);
});
