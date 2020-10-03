import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import utils from '../../utils/utils.js';

import './ProjectHeader.css';

const ProjectHeader = (props) => {
  const [shareClicked, setShareClicked] = useState(false);

  const toolbarStyles = {
    backgroundColor: `hsl(${props.hue}, 20%, 97%)`,
  };

  return (
    <div>
      <div style={toolbarStyles} className='project__toolbar'>
        <div className='toolbar__logo'>
          <Link to='/'>
            <h1 className='toolbar__h1'>Coɩɩab</h1>
          </Link>
        </div>
        <div className='toolbar__tools'>
          {/* Shareable Link Button */}
          <div className='project__toolbar--share project__toolbar--mobile-hidden'>
            <input
              id='project__toolbar--share--input'
              type='text'
              readOnly
              value={window.location.href}
            />

            <button
              className='btn toolbar__invite-btn'
              aria-label='Copy to clipboard'
              onClick={() => {
                utils.copyToClipboard(`project__toolbar--share--input`);
                setShareClicked(true);
              }}
            >
              {/* Clipboard Icon */}
              <svg
                width='20'
                height='20'
                viewBox='2 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z'
                  fill='#4A5568'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z'
                  fill='hsl(0, 0%, 10%)'
                />
              </svg>
              {shareClicked ? `Link Copied` : `Share Link`}
            </button>
          </div>

          {/* Color Theme Picker */}
          {/* <div className='project__toolbar--color project__toolbar--mobile-hidden'>
            <label htmlFor='project__toolbar--color--select' className='hidden'>
              Color:{' '}
            </label>
            <select
              defaultValue={'DEFAULT'}
              onChange={props.handleChangeColor}
              id='project__toolbar--color--select'
            >
              <option value='DEFAULT' disabled hidden>
                Color Theme
              </option>
              <option value='220'>Blue</option>
              <option value='0'>Red</option>
              <option value='120'>Green</option>
              <option value='180'>Cyan</option>
              <option value='300'>Magenta</option>
            </select>
          </div> */}

          {/* Color Theme Picker Radio Buttons */}
          <div className='toolbar__color-picker'>
            <fieldset>
              <legend aria-label='App Color Picker'></legend>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  className='toolbar__color-option toolbar__color-option--gray'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  className='toolbar__color-option toolbar__color-option--blue'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  className='toolbar__color-option toolbar__color-option--green'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  className='toolbar__color-option toolbar__color-option--cyan'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  className='toolbar__color-option toolbar__color-option--magenta'
                />
                <span></span>
              </label>
            </fieldset>
          </div>
        </div>
      </div>
      <div className='toolbar__spacer'></div>
    </div>
  );
};

export default ProjectHeader;
