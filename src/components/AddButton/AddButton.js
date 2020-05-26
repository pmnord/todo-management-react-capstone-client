import React, { useState, useEffect } from 'react';
import './addButton.css';

/* AddButton expects an onSubmit callback, 
a title for the content being added, 
and a unique id for labeling and setting event listeners */

export default function AddButton({ onSubmit, title, id }) {
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (showForm) {
            const formInput = document.getElementById(`add--tag--input--${id}`);
            formInput.focus();

            const root = document.getElementById('root');
            root.addEventListener('mousedown', (e) => {
                
                // Prevent the nav from toggling off unless the user clicks outside of the element
                for (let element of e.path) {
                    if (element.className === "AddButton__form") { return; }
                }

                if (showForm) {
                    setShowForm(false);
                }
            })
        }
    }, [showForm, id]);

    function handleFormSubmit(e) {
        e.preventDefault();

        const input = e.target[`add--tag--input--${id}`];
        if (input.value === '') { return; } // Don't allow empty tags

        onSubmit(input.value); // Pass the input value to the parent component's function

        input.value = '';
        setShowForm(false);
        return;
    }

    // Leaving this here in case we want to set the button color in the future
    const buttonStyle = {
        backgroundColor: `rgb(248, 248, 248)`,
    };


    if (showForm) {
        return (
            <form onSubmit={handleFormSubmit} className="AddButton__form">
                <label htmlFor={`add--tag--input--${id}`} hidden>{title} Name</label>
                <input 
                    required 
                    placeholder={`${title} Name`} type="text" id={`add--tag--input--${id}`} />
                <button>Add</button>
            </form>
        );
    }
    else {
        return (
            <div onClick={() => setShowForm(true)} style={buttonStyle} className="add-button">
                <svg className="add-button--plus-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z" fill="rgb(45, 47, 49)" />
                </svg>
                <span className="add-button__title">{title}</span>
            </div >
        );
    }


}

AddButton.defaultProps = {
    title: 'Add',
    onSubmit: () => { },
    id: Math.random()
}