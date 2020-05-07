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

    handleCreateTask = (e) => {
        e.preventDefault();
        const inputId = `newTaskName${this.props.title}`;

        const newTaskTitle = e.target[inputId].value;

        this.props.createTask(this.props.index, newTaskTitle);

        e.target[inputId].value = '';
    }

    handleDeleteCategory = (e) => {
        e.preventDefault();

        this.props.deleteCategory(this.props.index);
    }

    render() {
        return (
            <div className="category">

                <div className="category__header">
                    <h3 onDoubleClick={() => console.log('thats a double')}>
                        {this.props.title}
                    </h3>

                    {/* X icon */}
                    <svg onClick={this.handleDeleteCategory} className="category__header--x" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="hsl(0, 0%, 10%)" />
                    </svg>

                </div>

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
                            deleteTask={this.props.deleteTask}
                            addTag={this.props.addTag} />)
                    : null
                }

                {this.state.showAddForm ?
                    <form className="category__create-task-form" onSubmit={this.handleCreateTask}>
                        <label hidden htmlFor={`newTaskName${this.props.title}`}>New Task</label>
                        <input placeholder="Task Name" onBlur={this.toggleShowAddForm} id={`newTaskName${this.props.title}`} type="text" />
                        <button hidden>Create</button>
                    </form>
                    : <AddButton title="Task" onClick={() => this.toggleShowAddForm()} />}
            </div>
        )
    }
}