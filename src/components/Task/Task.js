import React from 'react';
import './task.css';
import { Draggable } from 'react-beautiful-dnd';

import Tags from '../Tags/Tags.js';
import DeleteButton from '../DeleteButton/DeleteButton.js';

export default function Task(props) {
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
            className='task'
            style={taskStyles}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className='task__body'>
              <div className='task__header'>
                <h4>{props.title}</h4>

                {/* X icon */}
                <DeleteButton
                  hue={props.hue}
                  id={`cat-${props.categoryIndex}-task-${props.index}-delete`}
                  deleteCallback={handleDeleteTask}
                  thingDeleted='task'
                />

                {/* <svg onClick={handleDeleteTask} className="task__header--x" width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="hsl(0, 0%, 10%, 0.6)" />
                          </svg> */}
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
                  hue={props.hue}
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
                rows='3'
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
