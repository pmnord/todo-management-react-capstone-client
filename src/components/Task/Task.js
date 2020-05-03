import React from 'react';
import './task.css';

export default function Task(props) {
    return (
        <div className="task">
            <h4>{props.title}</h4>
            <textarea></textarea>
        </div>
    )
}