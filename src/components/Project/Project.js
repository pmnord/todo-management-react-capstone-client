import React from 'react';
import './project.css';
import Category from '../Category/Category.js';
import ApiService from '../../service/api-service';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    getCategories() {
        const categories = ApiService.getProjectCategories();

        this.setState({ categories });
    }

    componentDidMount() {
        this.getCategories();
    }

    createCategory = (e) => {
        e.preventDefault();

        const newCategoryName = e.target.newCategoryName.value;
        const newCategory = {
            title: newCategoryName,
            tasks: []
        }
        const newState = { categories: [...this.state.categories, newCategory] }
        this.setState(newState);

        e.target.newCategoryName.value = '';
    }

    createTask = (e, categoryIndex, inputId) => {
        e.preventDefault();

        const newTaskName = e.target[inputId].value;
        const newTask = {
            title: newTaskName,
            category: categoryIndex,
            index: null,
            tags: []
        }
        const newState = { ...this.state };
        newState.categories[categoryIndex].tasks.push(newTask);

        this.setState(newState);

        e.target[inputId].value = '';
    }

    moveTask = (categoryIndex, taskIndex, direction) => {
        console.log(categoryIndex, taskIndex, direction)
        if (taskIndex - 1 < 0 && direction === 'up') { return; }
        if (categoryIndex - 1 < 0 && direction === 'left') { return; }
        if (categoryIndex + 1 >= this.state.categories.length && direction === 'right') { return; }

        const newState = { ...this.state };
        let taskToMove;

        switch (direction) {
            case 'left':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex - 1].tasks.push(taskToMove);
                break;
            case 'down':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex].tasks.splice(taskIndex + 1, 0, taskToMove);
                break;
            case 'up':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex].tasks.splice(taskIndex - 1, 0, taskToMove);
                break;
            case 'right':
                taskToMove = newState.categories[categoryIndex].tasks.splice(taskIndex, 1)[0];
                newState.categories[categoryIndex + 1].tasks.push(taskToMove);
                break;
            default:
                throw Error('A bad direction was passed to the moveTask() function')
        }

        this.setState(newState);
    }

    render() {
        return (
            <section className="project">

                <div className="project__board">
                    {this.state.categories ? this.state.categories.map((el, idx) => <Category key={idx} index={idx} title={el.title} tasks={el.tasks} createTask={this.createTask} moveTask={this.moveTask} />) : null}

                    <form className="project__create-category-form" onSubmit={this.createCategory}>
                        <label htmlFor="newCategoryName">New Category</label>
                        <input id="newCategoryName" type="text" />
                        <button>Create</button>
                    </form>
                </div>

            </section>
        )
    }
}


// for each category on this project, render a category component