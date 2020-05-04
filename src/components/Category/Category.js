import React from 'react';
import './category.css';
import Task from '../Task/Task';

export default function Category(props) {
    return (
        <div className="category">
            <h3>
                {props.title}
            </h3>
            {props.tasks.map((el, idx) =>
                <Task
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    index={idx}
                    tags={el.tags}
                    categoryIndex={props.index}
                    moveTask={props.moveTask} />)
            }
            <form className="category__create-task-form" onSubmit={(e) => props.createTask(e, props.index, `newTaskName${props.title}`)}>
                <label htmlFor={`newTaskName${props.title}`}>New Task</label>
                <input id={`newTaskName${props.title}`} type="text" />
                <button>Create</button>
            </form>
        </div>
    )
}