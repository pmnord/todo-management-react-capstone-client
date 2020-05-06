import React, { Component } from 'react';
import './category.css';
import Task from '../Task/Task';
import AddButton from '../AddButton/AddButton';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddForm: false,
        }
    }

    toggleShowAddForm = () => {
        this.setState({ showAddForm: !this.state.showAddForm })
    }

    componentDidUpdate = () => {
        if (this.state.showAddForm) {
            const input = document.getElementById(`newTaskName${this.props.title}`);
            input.focus();
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        this.props.createTask(e, this.props.index, `newTaskName${this.props.title}`);
    }

    render() {
        return (
            <div className="category">
                <h3>
                    {this.props.title}
                </h3>
                {this.props.tasks ?
                    this.props.tasks.map((el, idx) =>
                        <Task
                            key={el.id}
                            id={el.id}
                            title={el.title}
                            index={idx}
                            tags={el.tags}
                            categoryIndex={this.props.index}
                            moveTask={this.props.moveTask}
                            addTag={this.props.addTag} />)
                    : null
                }

                {this.state.showAddForm ?
                    <form className="category__create-task-form" onSubmit={this.handleFormSubmit}>
                        <label hidden htmlFor={`newTaskName${this.props.title}`}>New Task</label>
                        <input placeholder="Task Name" onBlur={this.toggleShowAddForm} id={`newTaskName${this.props.title}`} type="text" />
                        <button hidden>Create</button>
                    </form>
                    : <AddButton title="Task" onClick={() => this.toggleShowAddForm()} />}
            </div>
        )
    }
}