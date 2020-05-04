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
            <form className="category__create-task-form" onSubmit={(e) => props.createTask(e, props.index)}>
                <label htmlFor="newTaskName">New Task</label>
                <input id="newTaskName" type="text" />
                <button>Create</button>
            </form>
        </div>
    )
}