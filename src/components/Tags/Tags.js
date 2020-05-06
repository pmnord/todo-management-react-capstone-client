import React, { Component } from 'react';
import './tags.css';

// The Tags component displays tags that have been attached to a Task
// as well as providing a form for adding new tags
export default class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
        }
    }

    componentDidUpdate = () => {
        if (this.state.showForm) {
            this.focusInput();
        }
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    focusInput = () => {
        const formInput = document.getElementById(`add--tag--input--${this.props.taskId}`);
        if (formInput) {
            formInput.focus()
        }
    }

    handleAddTag = (e) => {
        e.preventdefault();
    }

    render() {
        return (
            <div className="tags" >

                {this.props.tags ?
                    this.props.tags.map((tag, idx) => <span key={idx} className="tags__tag">{tag}</span>)
                    : null}

                {this.state.showForm ?
                    <form onSubmit={(e) => { this.handleAddTag(e) }} onBlur={this.toggleForm} className="tags__add--tag--form" id={`add--tag--form--${this.props.taskId}`}>
                        <label htmlFor={`add--tag--input--${this.props.taskId}`} hidden>Tag Name</label>
                        <input type="text" id={`add--tag--input--${this.props.taskId}`} />
                        <button>Add</button>
                    </form >
                    :
                    <div onClick={this.toggleForm} className="tags__add--tag--button">
                        {/* Plus Icon */}
                        <svg className="tags__add--tag--plus" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z" fill="#4A5568" />
                        </svg>
                        <span>Tag</span>
                    </div>
                }

            </div >
        )
    }
}