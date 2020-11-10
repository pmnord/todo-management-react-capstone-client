import React from 'react';
import ReactDOM from 'react-dom';
import Task from './Task.js';
import Category from '../Category/Category.js';
import Project from '../Project/Project.js';

it('Renders the Task component', () => {
    const div = document.createElement('div');

    ReactDOM.render(
    <Project route={{match: {params: 'foo'}}}>
        <Category>
            <Task />
        </Category>
    </Project>
    , div);

    ReactDOM.unmountComponentAtNode(div);
});