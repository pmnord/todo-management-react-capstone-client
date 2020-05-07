import React from 'react';
import './addButton.css';

export default function AddButton({ onClick, title, color }) {

    // Set a color on the AddButton component by passing it a 'color' prop
    const buttonStyle = { 'background-color': color };

    return (
        <div onClick={onClick} style={buttonStyle} className="add-button">

            {/* Plus Icon */}
            <svg className="add-button--plus-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z" fill="rgb(45, 47, 49)" />
            </svg>

            <span className="add-button__title">{title || ''}</span>

        </div>
    )
}

AddButton.defaultProps = {
    title: 'Add',
    color: 'transparent',
};