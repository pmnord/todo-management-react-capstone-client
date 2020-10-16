import React from 'react';

import './TaskNotes.css';

const TaskNotes = ({ notes }) => {
  return (
    <ul className='TaskNotes'>
      {notes && notes.map((note, idx) => <li key={idx}>{note}</li>)}
    </ul>
  );
};

export default TaskNotes;
