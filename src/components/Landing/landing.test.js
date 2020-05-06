import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import { BrowserRouter } from 'react-router-dom';

it('Renders the Landing component', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter>
            <Landing />
        </BrowserRouter>
        , div);

    ReactDOM.unmountComponentAtNode(div);
});