import React from 'react';
import './category.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';
import DeleteButton from '../DeleteButton/DeleteButton.js';

export default function Category(props) {
  const handleDeleteCategory = () => {
    props.deleteCategory(props.index);
  };

  const categoryStyles = {
    backgroundColor: `hsl(${props.hue}, 20%, 90%)`,
  };

  return (
    <Draggable draggableId={props.uuid} index={props.index}>
      {(provided) => (
        <div
          className='category'
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={categoryStyles}
        >
          <div className='category__header' {...provided.dragHandleProps}>
            <h3 onDoubleClick={() => {}}>{props.title}</h3>

            {/* X icon */}
            {/* Only display a delete button if the category is empty */}
            {props.tasks.length === 0 ? (
              <DeleteButton
                id={`cat-${props.index}-delete`}
                hue={props.hue}
                thingDeleted='category'
                deleteCallback={handleDeleteCategory}
              />
            ) : null}
          </div>

          <Droppable droppableId={props.uuid} type='task'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ul className='category__tasks-ul'>
                  {props.tasks &&
                    props.tasks.map((task, idx) => (
                      <li key={task.uuid}>
                        <Task
                          uuid={task.uuid}
                          title={task.title}
                          dbIndex={task.index}
                          index={idx}
                          tags={task.tags}
                          notes={task.notes}
                          display={task.display}
                          categoryIndex={props.index}
                          category_uuid={props.category_uuid}
                          moveTask={props.moveTask}
                          deleteTask={props.deleteTask}
                          addTag={props.addTag}
                          deleteTag={props.deleteTag}
                          updateNote={props.updateNote}
                          hue={props.hue}
                          handleChangeNote={props.handleChangeNote}
                        />
                      </li>
                    ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>

          <AddButton
            title='Task'
            onSubmit={(newTaskTitle) => {
              props.createTask(props.index, newTaskTitle);
            }}
            id={`cat-${props.index}-add-task`}
          />
        </div>
      )}
    </Draggable>
  );
}
