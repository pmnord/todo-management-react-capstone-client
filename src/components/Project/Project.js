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
        const newState = { categories: [ ...this.state.categories, newCategory ] }
        this.setState(newState);

        e.target.newCategoryName.value = '';
    }

    createTask = (e, categoryIndex) => {
        e.preventDefault();

        const newTaskName = e.target.newTaskName.value;
        const newTask = {
            title: newTaskName
        }
        const newState = { ...this.state }
        newState.categories[categoryIndex].tasks.push(newTask);

        this.setState(newState);

        e.target.newTaskName.value = '';
    }

    render() {
        return (
            <section className="project">

                <div className="project__board">
                    {this.state.categories ? this.state.categories.map((el, idx) => <Category key={idx} index={idx} title={el.title} tasks={el.tasks} createTask={this.createTask} />) : null}

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