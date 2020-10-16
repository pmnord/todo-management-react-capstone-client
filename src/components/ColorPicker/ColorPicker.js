import React from 'react';

const ColorPicker = () => {
  return (
    <div className='ColorPicker'>
      {/* Radio buttons designed to preserve accessibility and also provide styling */}
      <fieldset className='ColorPicker__fieldset'>
        <legend aria-label='App Color Picker'></legend>
        <label className='ColorPicker__color-option-label'>
          <input
            type='radio'
            name='color'
            value='gray'
            defaultChecked={colorSelected.gray}
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
            defaultChecked={colorSelected.blue}
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
            defaultChecked={colorSelected.green}
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
            defaultChecked={colorSelected.cyan}
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
            defaultChecked={colorSelected.peach}
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
            defaultChecked={colorSelected.magenta}
            onClick={handleColorOptionClicked}
            className='ColorPicker__color-option ColorPicker__color-option--magenta'
          />
          <span></span>
        </label>
      </fieldset>
    </div>
  );
};

export default ColorPicker;
