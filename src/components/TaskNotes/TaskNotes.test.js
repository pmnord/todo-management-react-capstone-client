import React from 'react';
import ReactDOM from 'react-dom';
import TaskNotes from './TaskNotes';

it('Renders the TaskNotes component', () => {
  const div = document.createElement('div');

  ReactDOM.render(<TaskNotes />, div);

  ReactDOM.unmountComponentAtNode(div);
});
