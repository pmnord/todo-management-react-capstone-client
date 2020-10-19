import React from 'react';

import './ColorPicker.css';

const ColorPicker = () => {
  const handleColorOptionClicked = () => {};

  return (
    <div className='ColorPicker'>
      {/* Radio buttons designed to preserve accessibility and also provide styling */}
      <fieldset className='ColorPicker__fieldset'>
        <legend aria-label='App Color Picker'></legend>
        <div className='ColorPicker__color-grid'>
          <label className='ColorPicker__color-option-label'>
            <input
              type='radio'
              name='color'
              value='gray'
              defaultChecked={false}
              onClick={handleColorOptionClicked}
              className='ColorPicker__color-option ColorPicker__color-option--gray'
            />
            <span></span>
          </label>
          <label className='ColorPicker__color-option-label'>
            <input
              type='radio'
              name='color'
              value='blue'
              defaultChecked={false}
              onClick={handleColorOptionClicked}
              className='ColorPicker__color-option ColorPicker__color-option--blue'
            />
            <span></span>
          </label>
          <label className='ColorPicker__color-option-label'>
            <input
              type='radio'
              name='color'
              value='green'
              defaultChecked={false}
              onClick={handleColorOptionClicked}
              className='ColorPicker__color-option ColorPicker__color-option--green'
            />
            <span></span>
          </label>
          <label className='ColorPicker__color-option-label'>
            <input
              type='radio'
              name='color'
              value='cyan'
              defaultChecked={false}
              onClick={handleColorOptionClicked}
              className='ColorPicker__color-option ColorPicker__color-option--cyan'
            />
            <span></span>
          </label>
          <label className='ColorPicker__color-option-label'>
            <input
              type='radio'
              name='color'
              value='peach'
              defaultChecked={false}
              onClick={handleColorOptionClicked}
              className='ColorPicker__color-option ColorPicker__color-option--peach'
            />
            <span></span>
          </label>
          <label className='ColorPicker__color-option-label'>
            <input
              type='radio'
              name='color'
              value='magenta'
              defaultChecked={false}
              onClick={handleColorOptionClicked}
              className='ColorPicker__color-option ColorPicker__color-option--magenta'
            />
            <span></span>
          </label>
        </div>
      </fieldset>
    </div>
  );
};

export default ColorPicker;
