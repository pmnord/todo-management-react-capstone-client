import React from "react";
import "./task.css";
import { Draggable } from "react-beautiful-dnd";

import Tags from "../Tags/Tags.js";
import DeleteButton from "../DeleteButton/DeleteButton.js";

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
    <div>
      <Draggable draggableId={props.uuid} index={props.index}>
        {(provided) => (
          <div>
            <div
              className="task"
              style={taskStyles}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className="task__body">
                <div className="task__header">
                  <h4>{props.title}</h4>

                  {/* X icon */}
                  <DeleteButton
                    hue={props.hue}
                    id={`cat-${props.categoryIndex}-task-${props.index}-delete`}
                    deleteCallback={handleDeleteTask}
                    thingDeleted="task"
                  />

                  {/* <svg onClick={handleDeleteTask} className="task__header--x" width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="hsl(0, 0%, 10%, 0.6)" />
                          </svg> */}
                </div>
                <div className="task__tags">
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
                <textarea
                  rows="4"
                  onChange={handleNoteChange}
                  value={props.notes}
                  onBlur={handleUpdateNote}
                  style={{ resize: "none" }}
                ></textarea>
              </div>

              <div className="task__nav-arrows">
                <div>
                  {/* Up */}
                  <svg
                    onClick={(e) => {
                      props.moveTask(props.categoryIndex, props.index, "up");
                    }}
                    className="task__nav-arrow"
                    width="25"
                    height="25"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.29289 9.70711C2.90237 9.31658 2.90237 8.68342 3.29289 8.29289L9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L16.7071 8.29289C17.0976 8.68342 17.0976 9.31658 16.7071 9.70711C16.3166 10.0976 15.6834 10.0976 15.2929 9.70711L11 5.41421L11 17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17L9 5.41421L4.70711 9.70711C4.31658 10.0976 3.68342 10.0976 3.29289 9.70711Z"
                      fill="hsl(0, 0%, 35%)"
                    />
                  </svg>
                  {/* Down */}
                  <svg
                    onClick={(e) => {
                      props.moveTask(props.categoryIndex, props.index, "down");
                    }}
                    className="task__nav-arrow"
                    width="25"
                    height="25"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L3.29289 11.7071C2.90237 11.3166 2.90237 10.6834 3.29289 10.2929C3.68342 9.90237 4.31658 9.90237 4.70711 10.2929L9 14.5858L9 3C9 2.44772 9.44772 2 10 2C10.5523 2 11 2.44772 11 3L11 14.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929Z"
                      fill="hsl(0, 0%, 35%)"
                    />
                  </svg>
                </div>

                <div>
                  {/* Right */}
                  <svg
                    onClick={(e) => {
                      props.moveTask(props.categoryIndex, props.index, "right");
                    }}
                    className="task__nav-arrow"
                    width="25"
                    height="25"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.2929 3.29289C10.6834 2.90237 11.3166 2.90237 11.7071 3.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L11.7071 16.7071C11.3166 17.0976 10.6834 17.0976 10.2929 16.7071C9.90237 16.3166 9.90237 15.6834 10.2929 15.2929L14.5858 11L3 11C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L10.2929 4.70711C9.90237 4.31658 9.90237 3.68342 10.2929 3.29289Z"
                      fill="hsl(0, 0%, 35%)"
                    />
                  </svg>
                  {/* Left */}
                  <svg
                    onClick={(e) => {
                      props.moveTask(props.categoryIndex, props.index, "left");
                    }}
                    className="task__nav-arrow"
                    width="25"
                    height="25"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.70711 16.7071C9.31658 17.0976 8.68342 17.0976 8.29289 16.7071L2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289L8.29289 3.29289C8.68342 2.90237 9.31658 2.90237 9.70711 3.29289C10.0976 3.68342 10.0976 4.31658 9.70711 4.70711L5.41421 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11L5.41421 11L9.70711 15.2929C10.0976 15.6834 10.0976 16.3166 9.70711 16.7071Z"
                      fill="hsl(0, 0%, 35%)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
}
