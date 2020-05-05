import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Renders the App component', () => {
  const div = React.createElement('div');

  ReactDOM.render(<App />, div);

  ReactDOM.unmountComponentAtNode(div);
});