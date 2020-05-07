import React from 'react';
import './project.css';
import Category from '../Category/Category.js';
import AddButton from '../AddButton/AddButton';
// import ApiService from '../../service/api-service';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            showAddForm: false,
        }
    }

    uuid() { return Math.floor(Math.random() * 1000000) }

    componentDidMount() {
        const newState = {
            categories: [
                {
                    id: this.uuid(),
                    title: "Backlog",
                    tasks: [
                        {
                            id: this.uuid(),
                            title: "Clean the litterbox",
                            category: 0,
                            index: 0,
                            tags: ["Cat", "Cleaning"]
                        },
                        {
                            id: this.uuid(),
                            title: "Learn Mandarin",
                            category: 0,
                            index: 1,
                            tags: ["Language", "Learning"]
                        },
                        {
                            id: this.uuid(),
                            title: "Implement drag-and-drop",
                            category: 0,
                            index: 2,
                            tags: ["react-dnd", "Someday"]
                        }
                    ]
                },
                {
                    id: this.uuid(),
                    title: "In Progress",
                    tasks: [
                        {
                            id: this.uuid(),
                            title: "Eat a Whole Pizza",
                            category: 1,
                            index: 0,
                            tags: ["Food", "Bad Life Choices"]
                        }
                    ]
                }
            ]
        }

        // We need two copies of our data since one will be mutated 
        // by our filter function
        newState.originalCategories = [ ...newState.categories ];

        this.setState(newState);
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

        const input = document.getElementById('newCategoryName');
        input.blur();
    }

    deleteCategory = (categoryIndex) => {
        const newState = { ...this.state };
        newState.categories.splice(categoryIndex, 1);
        this.setState(newState);
    }

    createTask = (categoryIndex, newTaskTitle) => {
        const newTask = {
            title: newTaskTitle,
            category: categoryIndex,
            index: null,
            tags: [],
            id: this.uuid(),
        }

        const newState = { ...this.state };
        newState.categories[categoryIndex].tasks.push(newTask);

        this.setState(newState);
    }

    deleteTask = (categoryIndex, taskIndex) => {
        const newState = { ...this.state };
        newState.categories[categoryIndex].tasks.splice(taskIndex, 1);

        this.setState(newState);
    }

    moveTask = (categoryIndex, taskIndex, direction) => {
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

    addTag = (categoryIndex, taskIndex, newTag) => {
        const newState = { ...this.state };

        newState.categories[categoryIndex].tasks[taskIndex].tags.push(newTag);

        this.setState(newState);
    }

    toggleShowAddForm = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    }

    componentDidUpdate() {
        if (this.state.showAddForm) {
            const input = document.getElementById('newCategoryName');
            input.focus();
        }
    }

    filterByTag = (e) => {
        const filterValue = e.target.value.toLowerCase();

        console.log('Original', this.state.originalCategories);
        console.log('Current', this.state.categories);

        const newCategories = this.deepCopy(this.state.originalCategories);

        newCategories.forEach(category => {
            const newTasks = category.tasks.filter(task => {
                let taskHasTag = false;
                task.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(filterValue)) {
                        taskHasTag = true;
                    }
                })
                return taskHasTag;
            })
            category.tasks = newTasks;
        })

        this.setState({categories: newCategories});
    }

    deepCopy = (inObject) => {
        let outObject, value, key
      
        if (typeof inObject !== "object" || inObject === null) {
          return inObject // Return the value if inObject is not an object
        }
      
        // Create an array or object to hold the values
        outObject = Array.isArray(inObject) ? [] : {}
      
        for (key in inObject) {
          value = inObject[key]
      
          // Recursively (deep) copy for nested objects, including arrays
          outObject[key] = this.deepCopy(value)
        }
      
        return outObject
      }

    render() {
        return (
            <section className="project">

                <div className="project__toolbar">
                    <form onSubmit={(e) => { e.preventDefault(); }} className="project__filter">
                        <label htmlFor="filter-by-tag-input">Filter by Tag: </label>
                        <input onChange={this.filterByTag} type="text" id="filter-by-tag-input"></input>
                    </form>
                </div>

                <div className="project__board">
                    {this.state.categories
                        ? this.state.categories.map((el, idx) =>
                            <Category
                                key={idx}
                                index={idx}
                                title={el.title}
                                tasks={el.tasks}
                                createTask={this.createTask}
                                deleteTask={this.deleteTask}
                                moveTask={this.moveTask}
                                addTag={this.addTag}
                                deleteCategory={this.deleteCategory} />)
                        : null}

                    {this.state.showAddForm ?
                        <form className="project__create-category-form" onSubmit={this.createCategory}>
                            <label htmlFor="newCategoryName" hidden>New Category</label>
                            <input placeholder="Category Name" onBlur={this.toggleShowAddForm} id="newCategoryName" type="text" />
                            <button hidden>Create</button>
                        </form>
                        : <AddButton onClick={this.toggleShowAddForm} title="Category" />}

                </div>

            </section>
        )
    }
}


// for each category on this project, render a category component