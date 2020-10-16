import React from 'react';

import './TaskNotes.css';

const TaskNotes = ({ notes }) => {
  return (
    <div className='TaskNotes'>
      <label>Notes</label>
      <ul className='TaskNotes__ul'>
        {notes &&
          notes.map((note, idx) => (
            <li className='TaskNotes__note' key={idx}>
              {note}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskNotes;
