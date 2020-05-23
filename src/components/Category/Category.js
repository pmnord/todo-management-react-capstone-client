import React from 'react';
import './category.css';
import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';
import DeleteButton from '../DeleteButton/DeleteButton.js';

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
                    <DeleteButton id={`cat-${props.index}-delete`} hue={props.hue} thingDeleted="category" deleteCallback={handleDeleteCategory} />
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