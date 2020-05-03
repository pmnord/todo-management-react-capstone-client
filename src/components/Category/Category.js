import React from 'react';
import './category.css';
import Task from '../Task/Task';

export default function Category(props) {
    return (
        <div className="category">
            <h3>
                {props.title}
            </h3>
            {props.tasks ? props.tasks.map((el, idx) => <Task key={idx} title={el.title} />) : null}
        </div>
    )
}