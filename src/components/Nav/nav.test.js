import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';

it('Renders the Nav component', () => {
    const div = document.createElement('div', {id:'root'});


    ReactDOM.render(
            <Nav />
        , div);

    ReactDOM.unmountComponentAtNode(div);
});