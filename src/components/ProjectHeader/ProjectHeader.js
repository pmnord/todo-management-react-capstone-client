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
          <span></span>
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
              {/* Clipboard-copy */}
              <svg
                width='16'
                height='16'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4H10C10.5523 4 11 3.55228 11 3C11 2.44772 10.5523 2 10 2H8Z'
                  fill='hsl(0, 0%, 10%)'
                />
                <path
                  d='M3 5C3 3.89543 3.89543 3 5 3C5 4.65685 6.34315 6 8 6H10C11.6569 6 13 4.65685 13 3C14.1046 3 15 3.89543 15 5V11H10.4142L11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13H15V16C15 17.1046 14.1046 18 13 18H5C3.89543 18 3 17.1046 3 16V5Z'
                  fill='hsl(0, 0%, 10%)'
                />
                <path
                  d='M15 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H15V11Z'
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
                  value='gray'
                  onClick={(e) => props.handleChangeColor(e)}
                  className='toolbar__color-option toolbar__color-option--gray'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  value='blue'
                  onClick={(e) => props.handleChangeColor(e)}
                  className='toolbar__color-option toolbar__color-option--blue'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  value='green'
                  onClick={(e) => props.handleChangeColor(e)}
                  className='toolbar__color-option toolbar__color-option--green'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  value='cyan'
                  onClick={(e) => props.handleChangeColor(e)}
                  className='toolbar__color-option toolbar__color-option--cyan'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  value='peach'
                  onClick={(e) => props.handleChangeColor(e)}
                  className='toolbar__color-option toolbar__color-option--peach'
                />
                <span></span>
              </label>
              <label className='toolbar__color-option-label'>
                <input
                  type='radio'
                  name='color'
                  value='magenta'
                  onClick={(e) => props.handleChangeColor(e)}
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
