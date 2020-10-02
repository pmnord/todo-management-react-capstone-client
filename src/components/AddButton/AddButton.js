import React, { useState, useEffect } from 'react';
import './addButton.css';

/* AddButton expects an onSubmit callback, 
a title for the content being added, 
and a unique id for labeling and setting event listeners */

export default function AddButton({ onSubmit, title, id, style }) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      const formInput = document.getElementById(`add--tag--input--${id}`);
      formInput.focus();

      const root = document.getElementById('root');
      root.addEventListener('mousedown', (e) => {
        var path = e.path || (e.composedPath && e.composedPath()); // event.path is not standardized - this line is required for compatibilty with firefox

        // Prevent the nav from toggling off unless the user clicks outside of the element
        for (let element of path) {
          if (element.className === 'AddButton__form') {
            return;
          }
        }

        if (showForm) {
          setShowForm(false);
        }
      });
    }
  }, [showForm, id]);

  function handleFormSubmit(e) {
    e.preventDefault();

    const input = e.target[`add--tag--input--${id}`];
    if (input.value === '') {
      return;
    } // Don't allow empty tags

    onSubmit(input.value); // Pass the input value to the parent component's function

    input.value = '';
    setShowForm(false);
    return;
  }

  // Leaving this here in case we want to set the button color in the future

  if (showForm) {
    return (
      <form onSubmit={handleFormSubmit} className='AddButton__form'>
        <label htmlFor={`add--tag--input--${id}`} hidden>
          {title} Name
        </label>
        <input
          className='AddButton-form__input'
          type='text'
          required
          id={`add--tag--input--${id}`}
        />
        <button className='btn AddButton-form__submit'>Add {title}</button>
      </form>
    );
  } else {
    return (
      <button
        onClick={() => setShowForm(true)}
        className='AddButton__btn'
        style={style}
      >
        <svg
          width='18'
          height='18'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z'
            fill='hsl(0, 0%, 90%)'
          />
        </svg>
        {/* <span className='add-button__title'>{title}</span> */}
      </button>
    );
  }
}

AddButton.defaultProps = {
  title: 'Add',
  onSubmit: () => {},
  id: Math.random(),
};
