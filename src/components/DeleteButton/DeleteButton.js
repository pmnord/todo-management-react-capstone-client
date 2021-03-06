import React, { useState, useEffect } from 'react';
import './Deletebutton.css';

function DeleteButton({ thingDeleted, deleteCallback, hue, id }) {
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  // Toggles display of confirmation box on clicking out
  useEffect(() => {
    if (showConfirmBox) {
      document.getElementById(`${id}-delete-btn`).focus();

      const handleClickout = (e) => {
        // Prevent the nav from toggling off unless the user clicks outside of the element

        // Firefox does not have a .path property on mouseClick events
        const path = e.path || (e.composedPath && e.composedPath());

        for (let element of path) {
          if (element.className === 'DeleteButton__confirm-box') return;
        }

        if (showConfirmBox) setShowConfirmBox(false);
      };
      const root = document.getElementById('root');
      const clickoutListener = root.addEventListener(
        'mousedown',
        handleClickout
      );

      return () => root.removeEventListener('mousedown', clickoutListener);
    }
  }, [showConfirmBox, id]);

  const handleDelete = () => {
    deleteCallback();
    setShowConfirmBox(false);
    return;
  };

  return (
    <span className='DeleteButton'>
      <svg
        tabIndex='0'
        onClick={() => setShowConfirmBox(!showConfirmBox)}
        onKeyDown={(e) =>
          e.keyCode === 13 && setShowConfirmBox(!showConfirmBox)
        }
        className='DeleteButton__x'
        width='15'
        height='15'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z'
          fill='hsl(0, 0%, 10%, 0.6)'
        />
      </svg>

      {showConfirmBox ? (
        <div className='DeleteButton__confirm-box'>
          <p>Are you sure?</p>
          <div>
            <button
              className='btn'
              id={`${id}-delete-btn`}
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </span>
  );
}

DeleteButton.defaultProps = {
  thingDeleted: 'thing',
  hue: '220',
  deleteCallback: () => {},
};

export default DeleteButton;
