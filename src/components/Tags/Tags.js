import React, { Component } from 'react';
import './tags.css';
import AddButton from '../AddButton/AddButton';

// The Tags component displays tags that have been attached to a Task
// as well as providing a form for adding new tags
export default class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
        }
    }

    static defaultProps = {
        addTag: () => { },
    }

    componentDidUpdate = () => {
        if (this.state.showForm) {
            const formInput = document.getElementById(`add--tag--input--${this.props.taskId}`);
            formInput.focus();
        }
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    handleAddTag = (e) => {
        e.preventDefault();
        const input = e.target[`add--tag--input--${this.props.taskId}`];

        this.props.addTag(input.value);

        input.value = '';
    }

    render() {
        return (
            <div className="tags" >

                {this.props.tags ?
                    this.props.tags.map((tag, idx) => 
                        <span key={idx} className="tags__tag">{tag}
                        
                        {/* Expand this into its own Tag component */}

                        </span>)

                    : null}

                {this.state.showForm ?
                    <form onSubmit={e => this.handleAddTag(e)} className="tags__add--tag--form" id={`add--tag--form--${this.props.taskId}`}>
                        <label htmlFor={`add--tag--input--${this.props.taskId}`} hidden>Tag Name</label>
                        <input onBlur={this.toggleForm} placeholder="Tag Name" type="text" id={`add--tag--input--${this.props.taskId}`} />
                        <button hidden>Add Tag</button>
                    </form >
                    : <AddButton onClick={this.toggleForm} title="Tag" />
                }

            </div >
        )
    }
}