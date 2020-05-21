import React from 'react';
import './category.css';
import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';

export default function Category(props) {

    const handleDeleteCategory = () => {
        props.deleteCategory(props.index);
    }

    const categoryStyles = {
        backgroundColor: `hsl(${props.hue}, 20%, 90%)`
    }

    return (
        <div className="category" style={categoryStyles}>

            <div className="category__header">
                {/* TODO: Enable title edits on double click */}
                <h3 onDoubleClick={() => { }}>
                    {props.title}
                </h3>

                {/* X icon */}
                {/* Only display a delete button if the category is empty */}
                {props.tasks.length === 0 ?
                    <svg onClick={handleDeleteCategory} className="category__header--x" width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="hsl(0, 0%, 10%, 0.6)" />
                    </svg>
                    : null}
            </div>

            {props.tasks ?
                props.tasks.map((el, idx) =>
                    <Task
                        key={idx}
                        id={el.id}
                        title={el.title}
                        dbIndex={el.index}
                        index={idx}
                        tags={el.tags}
                        notes={el.notes}
                        display={el.display}
                        categoryIndex={props.index}
                        moveTask={props.moveTask}
                        deleteTask={props.deleteTask}
                        addTag={props.addTag}
                        deleteTag={props.deleteTag}
                        updateNote={props.updateNote}
                        hue={props.hue} />)
                : null
            }

            <AddButton
                title="Task"
                onSubmit={(newTaskTitle) => { props.createTask(props.index, newTaskTitle) }}
                id={`cat-${props.index}-add-task`} />

        </div>
    )
}