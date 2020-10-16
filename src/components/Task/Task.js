import React, { useState } from 'react';
import './task.css';
import { Draggable } from 'react-beautiful-dnd';

import Tags from '../Tags/Tags.js';
import TaskNotes from '../TaskNotes/TaskNotes';
import DeleteButton from '../DeleteButton/DeleteButton.js';
import AddButton from '../AddButton/AddButton';

const Task = (props) => {
  const [showEditDelete, setShowEditDelete] = useState(false);

  function handleDeleteTask() {
    props.deleteTask(props.categoryIndex, props.index);
  }

  return (
    <Draggable draggableId={props.uuid} index={props.index}>
      {(provided) => (
        <div>
          <div
            className={`Task ${props.color && `task--${props.color}`}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={() => setShowEditDelete(true)}
            onMouseLeave={() => setShowEditDelete(false)}
            onFocus={() => setShowEditDelete(true)}
          >
            <div className='Task__body'>
              <div className='Task__header'>
                <h4>{props.title}</h4>

                <div className='Task-header__delete-button-container'>
                  {showEditDelete && (
                    <DeleteButton
                      hue={props.hue}
                      id={`cat-${props.categoryIndex}-task-${props.index}-delete`}
                      deleteCallback={handleDeleteTask}
                      thingDeleted='task'
                    />
                  )}
                </div>
              </div>

              {props.tags.length > 0 && (
                <Tags
                  tags={props.tags || null}
                  taskId={props.id}
                  taskIndex={props.index}
                  categoryIndex={props.categoryIndex}
                  deleteTag={props.deleteTag}
                  color={props.color}
                />
              )}

              {props.notes.length > 0 && (
                <TaskNotes notes={props.notes} taskUuid={props.uuid} />
              )}
            </div>
            <div className='Task__buttons'>
              <AddButton
                type='tag'
                onSubmit={(tag) => {
                  props.addTag(props.categoryIndex, props.index, tag);
                }}
              />
              <AddButton
                type='note'
                onSubmit={(note) => {
                  props.addNote(props.categoryIndex, props.index, note);
                }}
              />
              <AddButton type='date' />
              <AddButton type='color' />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
