import React, { useState, useEffect } from 'react';
import './AddButton.css';
import utils from '../../utils/utils.js';

import ColorPicker from '../ColorPicker/ColorPicker.js';

/* AddButton expects an onSubmit callback, 
a type for the content being added, 
and a unique uuid for labeling and setting event listeners */

export default function AddButton({ type, onSubmit, uuid, style }) {
  const [showForm, setShowForm] = useState(false);

  console.log(type);

  useEffect(() => {
    if (showForm) {
      if (type !== 'color') {
        document.getElementById(`add--tag--input--${uuid}`).focus();
      }

      const root = document.getElementById('root');
      root.addEventListener('mousedown', (e) => {
        const path = e.path || (e.composedPath && e.composedPath()); // event.path is not standardized - this line is required for compatibilty with firefox

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
  }, [showForm, uuid]);

  function handleFormSubmit(e) {
    e.preventDefault();

    const input = e.target[`add--tag--input--${uuid}`];

    // Don't create empty tags
    if (input.value === '') {
      return;
    }

    // Pass the input value to the parent component's function
    onSubmit(input.value);

    input.value = '';
    setShowForm(false);
    return;
  }

  if (showForm && type !== 'color') {
    return (
      <div className='AddButton__form-container'>
        <form onSubmit={handleFormSubmit} className='AddButton__form'>
          <label htmlFor={`add--tag--input--${uuid}`} hidden>
            {type} Name
          </label>
          <input
            className='AddButton-form__input'
            type='text'
            required
            id={`add--tag--input--${uuid}`}
          />
          <button className='btn AddButton-form__submit'>Add {type}</button>
        </form>
      </div>
    );
  } else if (showForm && type === 'color') {
    return (
      <div className='AddButton__form-container'>
        <ColorPicker />
      </div>
    );
  } else {
    return (
      <button
        onClick={() => setShowForm(true)}
        className='AddButton__btn'
        style={style}
      >
        {(() => {
          switch (type) {
            case 'tag':
              return (
                <svg
                  width='18'
                  height='18'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                  ></path>
                </svg>
              );
            case 'note':
              return (
                <svg
                  width='18'
                  height='18'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  ></path>
                </svg>
              );
            case 'color':
              return (
                <svg
                  width='18'
                  height='18'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
                  ></path>
                </svg>
              );
            case 'date':
              return (
                <svg
                  width='18'
                  height='18'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  ></path>
                </svg>
              );
            default:
              return (
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
              );
          }
        })()}
      </button>
    );
  }
}

AddButton.defaultProps = {
  onSubmit: () => {},
  uuid: utils.uuid(),
  type: 'default',
};
