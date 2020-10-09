import React, { useState } from 'react';
import './task.css';
import { Draggable } from 'react-beautiful-dnd';

import Tags from '../Tags/Tags.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';

export default function Task(props) {
  const [showEditDelete, setShowEditDelete] = useState(false);

  function handleDeleteTask() {
    props.deleteTask(props.categoryIndex, props.index);
  }

  // For updating the note on the backend
  function handleUpdateNote(e) {
    const newNote = e.target.value;
    return props.updateNote(props.categoryIndex, props.index, newNote);
  }

  // For updating our controlled input component in Project state
  function handleNoteChange(e) {
    const newNoteValue = e.target.value;

    props.handleChangeNote(props.categoryIndex, props.index, newNoteValue);
  }

  const taskStyles = {
    backgroundColor: `hsl(${props.hue}, 30%, 95%)`,
    display: props.display,
  };

  return (
    <Draggable draggableId={props.uuid} index={props.index}>
      {(provided) => (
        <div>
          <div
            className={`task ${props.color && `task--${props.color}`}`}
            style={taskStyles}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onMouseEnter={() => setShowEditDelete(true)}
            onMouseLeave={() => setShowEditDelete(false)}
            onFocus={() => setShowEditDelete(true)}
          >
            <div className='task__body'>
              <div className='task__header'>
                <h4>{props.title}</h4>

                <div className='task-header__delete-button-container'>
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
              <div className='task__tags'>
                <Tags
                  tags={props.tags || null}
                  taskId={props.id}
                  taskIndex={props.index}
                  categoryIndex={props.categoryIndex}
                  addTag={(newTag) =>
                    props.addTag(props.categoryIndex, props.index, newTag)
                  }
                  deleteTag={props.deleteTag}
                  color={props.color}
                />
              </div>
              <label
                className='task__note-label'
                htmlFor={`task-note-${props.id}`}
              >
                Notes:
              </label>
              <textarea
                id={`task-note-${props.id}`}
                rows='2'
                onChange={handleNoteChange}
                value={props.notes}
                onBlur={handleUpdateNote}
                style={{ resize: 'none' }}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
