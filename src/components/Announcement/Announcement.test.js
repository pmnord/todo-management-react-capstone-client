import React from 'react';
import ReactDOM from 'react-dom';
import Announcement from './Announcement';

it('Renders the Announcement component', () => {
  const div = document.createElement('div');

  const mockMessage = 'lorem ipsum';

  ReactDOM.render(<Announcement message={mockMessage} />, div);

  ReactDOM.unmountComponentAtNode(div);
});
