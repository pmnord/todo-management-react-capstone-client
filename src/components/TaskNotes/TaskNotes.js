import React from 'react';

import './TaskNotes.css';

const TaskNotes = ({ notes, deleteNote, taskIndex, categoryIndex }) => {
  return (
    <div className='TaskNotes'>
      <label>Notes</label>
      <ul className='TaskNotes__ul'>
        {notes &&
          notes.map((note, noteIndex) => (
            <li
              className='TaskNotes__note'
              key={noteIndex}
              onClick={() => {
                console.log('deleteNote function not working 😡');
                deleteNote(taskIndex, categoryIndex, noteIndex);
              }}
            >
              {note}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskNotes;
